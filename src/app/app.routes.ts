import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'heroes',
    loadComponent: () =>
      import('./features/heroes/pages').then((m) => m.HeroListPageComponent),
  },
  {
    path: '',
    redirectTo: 'heroes',
    pathMatch: 'full',
  },
];
