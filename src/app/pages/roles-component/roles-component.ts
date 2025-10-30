import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RolesServices } from '../../services/roles.services';
import { Role } from '../../models/role.model';
import { CommonModule } from '@angular/common';
import { AuthServices } from '../../services/auth.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-roles-component',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './roles-component.html',
  styleUrls: ['./roles-component.scss'],
})
export class RolesComponent {
  roleForm!: FormGroup;
  roles: Role[] = [];
  editing = false;

  availablePages = ['Dashboard', 'Users'];
  availableFeatures = ['Add User', 'Edit User', 'Delete User'];

  constructor(
    private fb: FormBuilder,
    private roleService: RolesServices,
    private auth: AuthServices,
    private router: Router
  ) {}

  ngOnInit() {
    this.roles = this.roleService.getRoles();
    this.roleForm = this.fb.group({
      id: [0],
      name: ['', Validators.required],
      permissions: this.fb.group({
        pages: [[]],
        features: [[]],
      }),
    });
  }

  togglePermission(type: 'pages' | 'features', value: string, event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const control = this.roleForm.get(`permissions.${type}`);
    if (!control) return;

    const currentValues = control.value || [];
    if (checkbox.checked) {
      control.setValue([...currentValues, value]);
    } else {
      control.setValue(currentValues.filter((v: string) => v !== value));
    }
  }

  addRole() {
    if (this.roleForm.invalid) return;

    const role = this.roleForm.value as Role;

    if (this.editing) {
      const idx = this.roles.findIndex(r => r.id === role.id);
      if (idx !== -1) this.roles[idx] = role;
    } else {
      role.id = Date.now();
      this.roles.push(role);
    }

    this.roleService.saveRoles(this.roles);
    this.editing = false;

    this.roleForm.reset({
      id: 0,
      name: '',
      permissions: {
        pages: [],
        features: [],
      },
    });
  }

  editRole(role: Role) {
    this.roleForm.patchValue(role);
    this.editing = true;
  }

  deleteUser(id: number): void {
    this.roles = this.roles.filter(r => r.id !== id);
    this.roleService.saveRoles(this.roles);
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  dashboard() {
    this.router.navigate(['/dashboard']);
  }

  usersPage() {
    this.router.navigate(['/users']);
  }
}
