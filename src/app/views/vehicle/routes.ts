import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'vehicle',
    loadComponent: () => import('./vehicle.component').then(m => m.VehicleComponent),
    data: {
      title: `Vehicle`
    }
  }
];

