import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./vehicle.component').then(m => m.VehicleComponent),
    data: {
      title: `Vehicle`
    }
  }
];

