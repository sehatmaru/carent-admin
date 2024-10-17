import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./tenant.component').then(m => m.TenantComponent),
    data: {
      title: `Tenant`
    }
  }
];

