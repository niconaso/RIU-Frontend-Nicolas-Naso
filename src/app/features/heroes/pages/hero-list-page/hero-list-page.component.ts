import { AsyncPipe, CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject, switchMap } from 'rxjs';
import { SearchbarComponent } from '../../../../shared/components/searchbar/searchbar.component';
import { HeroListComponent } from '../../components';
import { IHeroService } from '../../interfaces';
import { Hero } from '../../models';
import { HEROES_SERVICE } from '../../services';

@Component({
  selector: 'app-hero-list-page',
  standalone: true,
  imports: [CommonModule, AsyncPipe, HeroListComponent, SearchbarComponent],
  templateUrl: './hero-list-page.component.html',
  styleUrl: './hero-list-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroListPageComponent {
  #heroService: IHeroService = inject(HEROES_SERVICE);

  #filterBy = new BehaviorSubject<string | null>(null);

  heroes$ = this.#filterBy
    .asObservable()
    .pipe(switchMap((filterBy) => this.#heroService.getAll(filterBy)));

  #destroyRef = inject(DestroyRef);

  onDelete(hero: Hero) {
    console.log(hero);
    this.#heroService
      .delete(hero.id)
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe();
  }

  onSearch(search: string | null) {
    this.#filterBy.next(search);
  }
}
