import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthServices } from './auth.services';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class authGuard implements CanActivate {
  constructor(private auth: AuthServices, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot) {
    const allowedRoles = route.data['roles'] as string[]; 

    return this.auth.isLoggedIn().pipe(
      map(isLogged => {
        const role = this.auth.getRole();
        console.log('Guard check:', { isLogged, role, allowedRoles });

        if (!isLogged) {
          this.router.navigate(['/login']);
          return false;
        }

        if (allowedRoles && !allowedRoles.includes(role!)) {
          this.router.navigate(['/login']);
          return false;
        }

        return true;
      })
    );
  }
}

