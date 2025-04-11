import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import HEROES from '../../../../../../public/data/heroes.json';
import { IHeroService } from '../../interfaces';
import { Hero } from '../../models';

@Injectable()
export class HeroMockService implements IHeroService {
  #heroes: BehaviorSubject<Hero[]> = new BehaviorSubject<Hero[]>(
    HEROES as Hero[],
  );

  getAll(filterBy?: string): Observable<Hero[]> {
    return this.#heroes
      .asObservable()
      .pipe(
        map((heroes) =>
          !filterBy
            ? heroes
            : heroes.filter((hero) =>
                hero.name
                  ?.toLocaleLowerCase()
                  ?.includes(filterBy?.toLocaleLowerCase()),
              ),
        ),
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

  update(hero: Hero): Observable<Hero> {
    this.#heroes.next(
      this.#heroes.getValue().map((h) => (h.id === hero.id ? hero : h)),
    );

    return of(hero);
  }
  delete(id: number): Observable<void> {
    this.#heroes.next(this.#heroes.getValue().filter((h) => h.id !== id));

    return of();
  }
}
