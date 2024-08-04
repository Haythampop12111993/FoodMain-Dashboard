import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { andminAuthGuard } from './guards/auth/andmin-auth.guard';
import { isHomeGuard } from './guards/Home/is-home.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, title: 'Admin Login' },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
    title: 'Dashboard',
    canMatch: [andminAuthGuard, isHomeGuard],
  },
];
