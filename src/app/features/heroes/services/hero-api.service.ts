import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { PaginatedResponse } from '../../../shared/models';
import { IHeroService } from '../interfaces';
import { Hero } from '../models';

@Injectable()
export class HeroAPIService implements IHeroService {
  #http: HttpClient = inject(HttpClient);

  getAll(
    pageIndex: number,
    pageSize: number,
    filterBy?: string | null,
  ): Observable<PaginatedResponse<Hero>> {
    const url = `${environment.http.api}/heroes`;

    let params: HttpParams = new HttpParams()
      // json-server starts in page 1
      .set('_page', pageIndex.toString())
      .set('_limit', pageSize.toString())
      .set('_per_page', pageSize.toString());

    if (filterBy) {
      params = params.set('name', filterBy);
    }
    return this.#http
      .get<any>(url, {
        params,
        observe: 'response',
      })
      .pipe(
        map(({ body }: any) => body),
        map(({ total, data }) => ({
          data,
          total,
        })),
      );
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
