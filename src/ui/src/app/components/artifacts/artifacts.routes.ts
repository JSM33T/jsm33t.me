import { Routes } from '@angular/router';

export const ARTIFACTS_ROUTES: Routes = [
  {
    path: 'view',
    loadComponent: () =>
      import('./view/view.component').then((m) => m.ViewComponent),
  },
];
