import { Routes } from '@angular/router';
import { ProfileGuardService } from '../../guard/profile.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./dashboard-admin.component').then(m => m.DashboardAdminComponent),
    data: {
      title: `Dashboard`
    },
    canActivate: [ProfileGuardService]
  }
];

