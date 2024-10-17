import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./order.component').then(m => m.OrderComponent),
    data: {
      title: `Order`
    }
  }
];

