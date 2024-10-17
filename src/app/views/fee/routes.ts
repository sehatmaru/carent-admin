import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./fee.component').then(m => m.FeeComponent),
    data: {
      title: `Fee`
    }
  }
];

