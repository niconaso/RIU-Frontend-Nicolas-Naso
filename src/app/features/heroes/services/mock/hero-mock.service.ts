import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import HEROES from '../../../../../../public/data/heroes.json';
import { IHeroService } from '../../interfaces';
import { Hero } from '../../models';

@Injectable()
export class HeroMockService implements IHeroService {
  #heroes: BehaviorSubject<Hero[]> = new BehaviorSubject<Hero[]>(HEROES);

  getAll(): Observable<Hero[]> {
    return this.#heroes.asObservable();
  }
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
