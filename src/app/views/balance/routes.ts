import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'balance',
    loadComponent: () => import('./balance.component').then(m => m.BalanceComponent),
    data: {
      title: `Balance`
    }
  }
];

