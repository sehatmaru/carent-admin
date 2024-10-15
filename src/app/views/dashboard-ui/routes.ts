import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./dashboard-ui.component').then(m => m.DashboardUiComponent),
    data: {
      title: $localize`Dashboard`
    }
  }
];

