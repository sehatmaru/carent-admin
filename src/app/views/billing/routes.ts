import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'billing',
    loadComponent: () => import('./billing.component').then(m => m.BillingComponent),
    data: {
      title: `Billing`
    }
  }
];

