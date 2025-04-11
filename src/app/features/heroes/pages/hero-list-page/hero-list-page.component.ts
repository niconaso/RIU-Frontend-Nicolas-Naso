import { AsyncPipe, CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { BehaviorSubject, combineLatest, switchMap } from 'rxjs';
import { ConfirmDialogComponent } from '../../../../shared/components';
import { SearchbarComponent } from '../../../../shared/components/searchbar/searchbar.component';
import { HeroListComponent } from '../../components';
import { IHeroService } from '../../interfaces';
import { Hero } from '../../models';
import { HEROES_SERVICE } from '../../services';
@Component({
  selector: 'app-hero-list-page',
  standalone: true,
  imports: [
    CommonModule,
    AsyncPipe,
    HeroListComponent,
    SearchbarComponent,
    MatDialogModule,
    MatButtonModule,
    RouterModule,
    MatPaginatorModule,
    MatTooltipModule,
  ],
  templateUrl: './hero-list-page.component.html',
  styleUrl: './hero-list-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroListPageComponent {
  #heroService: IHeroService = inject(HEROES_SERVICE);
  #destroyRef = inject(DestroyRef);
  #dialog = inject(MatDialog);

  #filterByBS = new BehaviorSubject<string | null>(null);
  #filterBy$ = this.#filterByBS
    .asObservable()
    .pipe(takeUntilDestroyed(this.#destroyRef));

  pageSizeBS = new BehaviorSubject<number>(10);
  pageSize$ = this.pageSizeBS.asObservable();

  pageIndexBS = new BehaviorSubject<number>(0);
  pageIndex$ = this.pageIndexBS.asObservable();

  results$ = combineLatest([
    this.#filterBy$,
    this.pageSize$,
    this.pageIndex$,
  ]).pipe(
    switchMap(([filterBy, pageSize, pageIndex]) =>
      this.#heroService.getAll(pageIndex, pageSize, filterBy),
    ),
  );

  onDelete(hero: Hero) {
    const dialogRef = this.#dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete hero',
        message: `Are you sure you want to delete ${hero.name}?`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteHero(hero);
      }
    });
  }

  onSearch(search: string | null) {
    this.#filterByBS.next(search);
  }

  onPageChange(event: any) {
    this.pageIndexBS.next(event.pageIndex);
    this.pageSizeBS.next(event.pageSize);
  }

  private deleteHero(hero: Hero) {
    this.#heroService
      .delete(hero.id)
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe();
  }
}
