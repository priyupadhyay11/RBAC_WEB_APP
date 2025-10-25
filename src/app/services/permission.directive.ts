import { Directive, ElementRef, inject, Input } from '@angular/core';
import { AuthServices } from './auth.services';
import { RolesServices } from './roles.services';

@Directive({
  selector: '[appPermissionDirective]'
})
export class PermissionDirective {
  private auth = inject(AuthServices);
  private roles = inject(RolesServices);

  @Input('appHasPermission') feature!: string;

  ngOnInit() {
    const userRole = this.auth.getRole();
    // const role = this.roles.roles().find((r:any) => r.name === userRole);
    // const allowed = role?.permissions.features.includes(this.feature);
    // if (!allowed) this.el.nativeElement.style.display = 'none';
  }

  constructor(private el: ElementRef) {}
}
