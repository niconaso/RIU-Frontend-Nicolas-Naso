import { Observable } from 'rxjs';
import { Hero } from '../models';

export interface IHeroService {
  /**
   * Get all heroes
   *
   * @return {*}  {Observable<Hero[]>}
   * @memberof IHeroService
   */
  getAll(filterBy?: string | null): Observable<Hero[]>;

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
  create(hero: Hero): Observable<Hero>;

  /**
   * Update hero
   *
   * @param {Hero} hero
   * @return {*}  {Observable<Hero>}
   * @memberof IHeroService
   */
  update(hero: Hero): Observable<Hero>;

  /**
   * Delete hero
   *
   * @param {number} id
   * @return {*}  {Observable<void>}
   * @memberof IHeroService
   */
  delete(id: number): Observable<void>;
}
