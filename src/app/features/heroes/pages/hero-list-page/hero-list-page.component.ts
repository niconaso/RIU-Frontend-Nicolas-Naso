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
import { RouterModule } from '@angular/router';
import { BehaviorSubject, switchMap } from 'rxjs';
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
  ],
  templateUrl: './hero-list-page.component.html',
  styleUrl: './hero-list-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroListPageComponent {
  #heroService: IHeroService = inject(HEROES_SERVICE);
  #destroyRef = inject(DestroyRef);
  #dialog = inject(MatDialog);

  #filterBy = new BehaviorSubject<string | null>(null);

  heroes$ = this.#filterBy
    .asObservable()
    .pipe(switchMap((filterBy) => this.#heroService.getAll(filterBy)));

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
    this.#filterBy.next(search);
  }

  private deleteHero(hero: Hero) {
    this.#heroService
      .delete(hero.id)
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe();
  }
}
