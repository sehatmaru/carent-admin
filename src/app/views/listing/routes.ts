import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./listing.component').then(m => m.ListingComponent),
    data: {
      title: `Listing`
    }
  }
];

