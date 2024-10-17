import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'company',
    loadComponent: () => import('./company.component').then(m => m.CompanyComponent),
    data: {
      title: `Company`
    }
  }
];

