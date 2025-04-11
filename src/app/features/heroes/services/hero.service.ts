import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { IHeroService } from '../interfaces';
import { Hero } from '../models';

@Injectable()
export class HeroService implements IHeroService {
  #http: HttpClient = inject(HttpClient);

  getAll(): Observable<Hero[]> {
    const url = `${environment.http.api}/heroes`;

    return this.#http.get<Hero[]>(url);
  }
  get(id: number): Observable<Hero> {
    const url = `${environment.http.api}/heroes`;

    return this.#http.get<Hero>(`${url}/${id}`);
  }
  create(hero: Hero): Observable<Hero> {
    const url = `${environment.http.api}/heroes`;

    return this.#http.post<Hero>(url, hero);
  }

  update(hero: Hero): Observable<Hero> {
    const url = `${environment.http.api}/heroes/${hero.id}`;

    return this.#http.put<Hero>(`${url}`, hero);
  }
  delete(id: number): Observable<void> {
    const url = `${environment.http.api}/heroes/${id}`;

    return this.#http.delete<void>(`${url}`);
  }
}
