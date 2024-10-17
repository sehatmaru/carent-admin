import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./customer.component').then(m => m.CustomerComponent),
    data: {
      title: `Customer`
    }
  }
];

