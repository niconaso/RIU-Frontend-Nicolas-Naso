import { InjectionToken } from '@angular/core';
import { IHeroService } from '../interfaces';

export const HEROES_SERVICE = new InjectionToken<IHeroService>(
  'Heroes Service Token',
);
