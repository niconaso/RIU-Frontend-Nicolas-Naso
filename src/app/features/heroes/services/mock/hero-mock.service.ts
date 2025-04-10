import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import HEROES from '../../../../../../public/data/heroes.json';
import { IHeroService } from '../../interfaces';
import { Hero } from '../../models';

@Injectable()
export class HeroMockService implements IHeroService {
  #heroes: Hero[] = HEROES;

  getAll(): Observable<Hero[]> {
    return of([...HEROES]);
  }
  get(id: number): Observable<Hero> {
    return of(HEROES.find((hero) => hero.id === id)!);
  }
  create(hero: Hero): Observable<Hero> {
    const newHero = { ...hero, id: Date.now(), name: hero.name };
    this.#heroes.push(newHero);
    return of(newHero);
  }

  update(hero: Hero): Observable<Hero> {
    const index = this.#heroes.findIndex((h) => h.id === hero.id);
    this.#heroes[index] = hero;
    return of(hero);
  }
  delete(id: number): Observable<Hero> {
    const index = this.#heroes.findIndex((h) => h.id === id);
    this.#heroes.splice(index, 1);
    return of(this.#heroes[index]);
  }
}
