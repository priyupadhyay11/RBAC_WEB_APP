import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { UsersComponent } from './pages/users-component/users-component';
import { Dashboard } from './pages/dashboard/dashboard';
import { RolesComponent } from './pages/roles-component/roles-component';
import { authGuard } from './services/auth-guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login').then((m) => m.Login),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./pages/dashboard/dashboard').then((m) => m.Dashboard),
    canActivate: [authGuard],
    data: { roles: ['admin'] },
  },
  {
    path: 'users',
    loadComponent: () =>
      import('./pages/users-component/users-component').then(
        (m) => m.UsersComponent
      ),
    canActivate: [authGuard],
    data: { roles: ['user', 'admin'] },
  },
  {
    path: 'roles',
    loadComponent: () =>
      import('./pages/roles-component/roles-component').then(
        (m) => m.RolesComponent
      ),
    canActivate: [authGuard],
    data: { roles: ['admin'] },
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];

