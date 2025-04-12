import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages').then((m) => m.HeroListPageComponent),
  },
  {
    path: 'new',
    loadComponent: () => import('./pages').then((m) => m.HeroEditPageComponent),
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./pages').then((m) => m.HeroEditPageComponent),
  },
];
