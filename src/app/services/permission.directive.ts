import { Directive, ElementRef, inject, Input } from '@angular/core';
import { AuthServices } from './auth.services';
import { RolesServices } from './roles.services';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { map } from 'rxjs/operators';
@Directive({
  selector: '[appPermissionDirective]'
})
export class PermissionDirective implements CanActivate {
  constructor(private auth: AuthServices, private router: Router) {}
   canActivate(route: ActivatedRouteSnapshot) {
    const expectedRole = route.data['role'] as string;

    return this.auth.isLoggedIn().pipe(
      map(isLogged => {
        const role = this.auth.getRole();
        if (!isLogged || role !== expectedRole) {
          this.router.navigate(['/login']);
          return false;
        }
        return true;
      })
    );
  }
}
