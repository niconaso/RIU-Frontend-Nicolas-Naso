import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'heroes',
    loadChildren: () => import('./features/heroes').then((m) => m.routes),
  },
  {
    path: '',
    redirectTo: 'heroes',
    pathMatch: 'full',
  },
];
