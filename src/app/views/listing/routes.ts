import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'listing',
    loadComponent: () => import('./listing.component').then(m => m.ListingComponent),
    data: {
      title: `Listing`
    }
  }
];

