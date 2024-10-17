import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'booking',
    loadComponent: () => import('./booking.component').then(m => m.BookingComponent),
    data: {
      title: `Booking`
    }
  }
];

