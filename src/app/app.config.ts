import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
  withViewTransitions,
} from '@angular/router';

import { provideHttpClient } from '@angular/common/http';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { environment } from '../environments/environment';
import { routes } from './app.routes';
import { HEROES_SERVICE, HeroService } from './features/heroes/services/';
import { HeroMockService } from './features/heroes/services/mock/hero-mock.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding(), withViewTransitions()),
    provideAnimationsAsync(),
    provideHttpClient(),

    {
      provide: HEROES_SERVICE,
      useFactory: () =>
        environment.http.useMockData
          ? new HeroMockService()
          : new HeroService(),
    },

    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'fill',
      },
    },
  ],
};
