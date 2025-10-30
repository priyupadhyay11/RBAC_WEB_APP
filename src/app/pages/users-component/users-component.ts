import { Component, OnInit } from '@angular/core';
import { AuthServices } from '../../services/auth.services';
import { Router, RouterLink } from '@angular/router';
import { RolesServices } from '../../services/roles.services';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserServices } from '../../services/user.services';
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { Role } from '../../models/role.model';


@Component({
  selector: 'app-users-component',
  templateUrl: './users-component.html',
  styleUrl: './users-component.scss',
  imports: [CommonModule, ReactiveFormsModule,FormsModule],
})
export class UsersComponent implements OnInit {
  userForm!: FormGroup;
  editing = false;
  users: User[] = [];
  roles: Role[] = [];
  loggedInRole?: Role;

  constructor(
    private fb: FormBuilder,
    private userService: UserServices,
    private roleService: RolesServices,
    private auth: AuthServices,
    private router: Router
  ) {}

  ngOnInit() {
    this.users = this.userService.getUsers();
    this.roles = this.roleService.getRoles();
    this.loggedInRole = this.auth.getLoggedInUserRole();

    this.userForm = this.fb.group({
      id: [0],
      name: ['', Validators.required],
      roleId: [null, Validators.required],
    });
  }

canEdit(): boolean {
  return !!this.loggedInRole?.permissions?.features?.includes('Edit User');
}

canDelete(): boolean {
  return !!this.loggedInRole?.permissions?.features?.includes('Delete User');
}

  addUser() {
    if (this.userForm.invalid) return;

    const user = this.userForm.value as User;

    if (this.editing) {
      const idx = this.users.findIndex(u => u.id === user.id);
      if (idx !== -1) this.users[idx] = user;
    } else {
      user.id = Date.now();
      this.users.push(user);
    }

    this.userService.saveUsers(this.users);
    this.userForm.reset({ id: 0, name: '', email: '', roleId: null });
    this.editing = false;
  }

  editUser(user: User) {
    if (!this.canEdit()) return;
    this.userForm.patchValue(user);
    this.editing = true;
  }

  deleteUser(id: number) {
    if (!this.canDelete()) return;
    this.users = this.users.filter(u => u.id !== id);
    this.userService.saveUsers(this.users);
  }
getRoleName(roleId: number): string {
  const role = this.roles.find(r => r.id === roleId);
  return role ? role.name : 'N/A';
}
dashboard(){
   this.router.navigate(['/dashboard']);
}
rolePage() {
   this.router.navigate(['/roles']);
}
  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}