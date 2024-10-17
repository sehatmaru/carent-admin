import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'order',
    loadComponent: () => import('./order.component').then(m => m.OrderComponent),
    data: {
      title: `Order`
    }
  }
];

