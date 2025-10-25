import { Injectable, signal } from '@angular/core';
import { Role } from '../models/role.model';
import { User } from '../models/user.model';
@Injectable({
  providedIn: 'root'
})
export class RolesServices {
 private ROLE_KEY = 'roles';
  private USER_KEY = 'users';

  constructor() {
    if (!localStorage.getItem(this.ROLE_KEY)) {
      this.seedData();
    }
  }

  private seedData() {
    const defaultRoles: Role[] = [
      {
        id: 1,
        name: 'Admin',
        permissions: {
          pages: ['Dashboard', 'Users'],
          features: ['Add User', 'Edit User', 'Delete User'],
        },
      },
    ];
    localStorage.setItem(this.ROLE_KEY, JSON.stringify(defaultRoles));
    localStorage.setItem(this.USER_KEY, JSON.stringify([]));
  }

  // --- Role methods ---
  getRoles(): Role[] {
    return JSON.parse(localStorage.getItem(this.ROLE_KEY) || '[]');
  }

  saveRoles(roles: Role[]) {
    localStorage.setItem(this.ROLE_KEY, JSON.stringify(roles));
  }

  // --- User methods ---
  getUsers(): User[] {
    return JSON.parse(localStorage.getItem(this.USER_KEY) || '[]');
  }

  saveUsers(users: User[]) {
    localStorage.setItem(this.USER_KEY, JSON.stringify(users));
  }
 
}
