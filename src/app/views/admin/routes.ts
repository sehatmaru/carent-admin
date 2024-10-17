import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'admin',
    loadComponent: () => import('./admin.component').then(m => m.AdminComponent),
    data: {
      title: `Admin`
    }
  }
];

