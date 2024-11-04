import { Routes } from '@angular/router'
import { DefaultLayoutComponent } from './layout'
import { DashboardGuardService } from './guard/dashboard.guard'
import { LoginGuardService } from './guard/login.guard'
import { AdminManagerGuardService } from './guard/admin-manager.guard'

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home',
    },
    canActivate: [DashboardGuardService],
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./views/dashboard/routes').then((m) => m.routes),
      },
      {
        path: 'admin',
        loadChildren: () =>
          import('./views/admin/routes').then((m) => m.routes),
      },
      {
        path: 'balance',
        loadChildren: () =>
          import('./views/balance/routes').then((m) => m.routes),
      },
      {
        path: 'billing',
        loadChildren: () =>
          import('./views/billing/routes').then((m) => m.routes),
      },
      {
        path: 'booking',
        loadChildren: () =>
          import('./views/booking/routes').then((m) => m.routes),
      },
      {
        path: 'company',
        loadChildren: () =>
          import('./views/company/routes').then((m) => m.routes),
      },
      {
        path: 'customer',
        loadChildren: () =>
          import('./views/customer/routes').then((m) => m.routes),
      },
      {
        path: 'fee',
        loadChildren: () => import('./views/fee/routes').then((m) => m.routes),
      },
      {
        path: 'listing',
        loadChildren: () =>
          import('./views/listing/routes').then((m) => m.routes),
      },
      {
        path: 'order',
        loadChildren: () =>
          import('./views/order/routes').then((m) => m.routes),
      },
      {
        path: 'tenant',
        loadChildren: () =>
          import('./views/tenant/routes').then((m) => m.routes),
      },
      {
        path: 'vehicle',
        loadChildren: () =>
          import('./views/vehicle/routes').then((m) => m.routes),
      },
      {
        path: 'theme',
        loadChildren: () =>
          import('./views/theme/routes').then((m) => m.routes),
        canActivate: [AdminManagerGuardService],
      },
      {
        path: 'base',
        loadChildren: () => import('./views/base/routes').then((m) => m.routes),
        canActivate: [AdminManagerGuardService],
      },
      {
        path: 'buttons',
        loadChildren: () =>
          import('./views/buttons/routes').then((m) => m.routes),
        canActivate: [AdminManagerGuardService],
      },
      {
        path: 'forms',
        loadChildren: () =>
          import('./views/forms/routes').then((m) => m.routes),
        canActivate: [AdminManagerGuardService],
      },
      {
        path: 'icons',
        loadChildren: () =>
          import('./views/icons/routes').then((m) => m.routes),
        canActivate: [AdminManagerGuardService],
      },
      {
        path: 'notifications',
        loadChildren: () =>
          import('./views/notifications/routes').then((m) => m.routes),
        canActivate: [AdminManagerGuardService],
      },
      {
        path: 'widgets',
        loadChildren: () =>
          import('./views/widgets/routes').then((m) => m.routes),
        canActivate: [AdminManagerGuardService],
      },
      {
        path: 'charts',
        loadChildren: () =>
          import('./views/charts/routes').then((m) => m.routes),
        canActivate: [AdminManagerGuardService],
      },
      {
        path: 'pages',
        loadChildren: () =>
          import('./views/pages/routes').then((m) => m.routes),
        canActivate: [AdminManagerGuardService],
      },
    ],
  },
  {
    path: '404',
    loadComponent: () =>
      import('./views/pages/page404/page404.component').then(
        (m) => m.Page404Component
      ),
    data: {
      title: 'Page 404',
    },
  },
  {
    path: '500',
    loadComponent: () =>
      import('./views/pages/page500/page500.component').then(
        (m) => m.Page500Component
      ),
    data: {
      title: 'Page 500',
    },
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./views/pages/login/login.component').then(
        (m) => m.LoginComponent
      ),
    data: {
      title: 'Login Page',
    },
    canActivate: [LoginGuardService],
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./views/pages/register/register.component').then(
        (m) => m.RegisterComponent
      ),
    canActivate: [LoginGuardService, AdminManagerGuardService],
    data: {
      title: 'Register Page',
    },
  },
  { path: '**', redirectTo: '404' },
]
