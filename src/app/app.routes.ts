import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { UsersComponent } from './pages/users-component/users-component';
import { Dashboard } from './pages/dashboard/dashboard';
import { RolesComponent } from './pages/roles-component/roles-component';
import { authGuard } from './services/auth-guard';

export const routes: Routes = [
     { path: 'login', component: Login },
  {
    path: '',
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', component: Dashboard},
      { path: 'users', component: UsersComponent },
      { path: 'roles', component: RolesComponent  },
       { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ]
  },
  { path: '**', redirectTo: 'login' }
];
