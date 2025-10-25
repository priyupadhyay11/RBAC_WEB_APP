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
  currentUserRole = 'Admin';
  currentPermissions: string[] = [];
  constructor(
    private fb: FormBuilder,
    private userService: UserServices,
    private roleService: RolesServices,
    public auth: AuthServices,
    private router: Router
  ) {

    this.userForm = this.fb.group({
    id: [0],
      name: [''],
      email: [''],
      roleId: [null],
    });
  }
  ngOnInit(): void {
    this.loadUsers();
  }
  loadUsers(): void {
    const storedData = localStorage.getItem('roles');
    this.users = storedData ? JSON.parse(storedData) : [];
  
  }
 getRoleName(roleId: number): string {
    const role = this.roles.find(r => r.id === roleId);
    return role ? role.name : 'No Role';
  }

  getRoles() {
    return this.roleService.getRoles().map((r) => r.name);
  }

  addUser() {
     const user = this.userForm.value as User;
    if (this.editing) {
      const idx = this.users.findIndex(u => u.id === user.id);
      this.users[idx] = user;
    } else {
      user.id = Date.now();
      this.users.push(user);
    }
    this.roleService.saveUsers(this.users);
    this.userForm.reset();
    this.editing = false;
  }

  editUser(user: User) {
    if (!this.hasPermission('Edit User')) return;
    this.userForm.patchValue(user);
    this.editing = true;
  }


    deleteUser(id: number): void {
    this.users = this.users.filter(u => u.id !== id);
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  hasPermission(feature: string) {
    return this.currentPermissions.includes(feature);
  }
  updateUserRole(user: any) {
    console.log(`Updated ${user.name}'s role to`, this.getRoleName(user.roleId));
  }
  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
  dashboard(){
    this.router.navigate(['/dashboard']);
  }
    rolePage() {
    this.router.navigate(['/roles']);
  }
}
