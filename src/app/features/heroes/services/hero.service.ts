import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { PaginatedResponse } from '../../../shared/models';
import { IHeroService } from '../interfaces';
import { Hero } from '../models';

@Injectable()
export class HeroService implements IHeroService {
  #http: HttpClient = inject(HttpClient);

  getAll(
    pageIndex: number,
    pageSize: number,
    filterBy?: string | null,
  ): Observable<PaginatedResponse<Hero>> {
    const url = `${environment.http.api}/heroes`;

    let params: HttpParams = new HttpParams()
      .set('page', pageIndex.toString())
      .set('limit', pageSize.toString());

    if (filterBy) {
      params = params.set('filterBy', filterBy);
    }
    return this.#http.get<PaginatedResponse<Hero>>(url, {
      params,
    });
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
