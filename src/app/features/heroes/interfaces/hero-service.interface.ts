import { Observable } from 'rxjs';
import { PaginatedResponse } from '../../../shared/models';
import { Hero } from '../models';

export interface IHeroService {
  /**
   *
   *
   * @param {number} pageIndex
   * @param {number} pageSize
   * @param {(string | null)} [filterBy]
   * @return {*}  { Observable<PaginatedResponse<Hero>>}
   * @memberof IHeroService
   */
  getAll(
    pageIndex: number,
    pageSize: number,
    filterBy?: string | null,
  ): Observable<PaginatedResponse<Hero>>;

  /**
   * Get hero
   *
   * @param {number} id
   * @return {*}  {Observable<Hero>}
   * @memberof IHeroService
   */
  get(id: number): Observable<Hero>;

  /**
   * Create hero
   *
   * @param {Hero} hero
   * @return {*}  {Observable<Hero>}
   * @memberof IHeroService
   */
  create(hero: Partial<Hero>): Observable<Hero>;

  /**
   * Update hero
   *
   * @param {Hero} hero
   * @return {*}  {Observable<Hero>}
   * @memberof IHeroService
   */
  update(hero: Partial<Hero>): Observable<Hero>;

  /**
   * Delete hero
   *
   * @param {number} id
   * @return {*}  {Observable<void>}
   * @memberof IHeroService
   */
  delete(id: number): Observable<void>;
}
