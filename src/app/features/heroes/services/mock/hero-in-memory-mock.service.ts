import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, delay, map, Observable, of, tap } from 'rxjs';
import HEROES from '../../../../../../public/data/heroes.json';
import { LoadingService } from '../../../../core/services';
import { PaginatedResponse } from '../../../../shared/models';
import { IHeroService } from '../../interfaces';
import { Hero } from '../../models';

@Injectable()
export class HeroInmemoryMockService implements IHeroService {
  #heroes: BehaviorSubject<Hero[]> = new BehaviorSubject<Hero[]>(
    HEROES.heroes as Hero[],
  );

  #loadingService = inject(LoadingService);

  readonly DELAY: number = 1000;

  getAll(
    pageIndex: number,
    pageSize: number,
    filterBy?: string | null,
  ): Observable<PaginatedResponse<Hero>> {
    this.#loadingService.show();

    return this.#heroes.asObservable().pipe(
      delay(this.DELAY),
      map((heroes) =>
        !filterBy
          ? heroes
          : heroes.filter((hero) =>
              hero.name
                ?.toLocaleLowerCase()
                ?.includes(filterBy?.toLocaleLowerCase()),
            ),
      ),
      map((heroes: Hero[]) => ({
        data: heroes.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize),
        total: heroes.length,
      })),
      tap(() => this.#loadingService.hide()),
    );
  }
  /**
   *
   *
   * @param {number} id
   * @return {*}  {Observable<Hero>}
   * @memberof HeroMockService
   */
  get(id: number): Observable<Hero> {
    const hero = this.#heroes.getValue().find((hero) => hero.id === id);
    return of(hero!);
  }
  create(hero: Hero): Observable<Hero> {
    const newHero = { ...hero, id: Date.now(), name: hero.name };
    this.#heroes.next([...this.#heroes.getValue(), newHero]);
    return of(newHero);
  }

  update(updatedHero: Hero): Observable<Hero> {
    const heroes = this.#heroes.getValue().map((hero) =>
      hero.id === updatedHero.id
        ? {
            ...hero,
            ...updatedHero,
          }
        : hero,
    );

    this.#heroes.next(heroes);

    return of(updatedHero);
  }
  delete(id: number): Observable<any> {
    this.#loadingService.show();

    this.#heroes.next(this.#heroes.getValue().filter((h) => h.id !== id));

    return of(delay(this.DELAY));
  }
}
