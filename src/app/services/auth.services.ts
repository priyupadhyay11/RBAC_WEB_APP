import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Role } from '../models/role.model';

export type RoleName = 'admin' | 'user' | 'manager';

interface User {
  username: string;
  password: string;
  role: RoleName;
}

@Injectable({
  providedIn: 'root'
})
export class AuthServices {
  private authState = new BehaviorSubject<boolean>(this.hasToken());
  private readonly USERS: User[] = [
    { username: 'admin', password: '1234', role: 'admin' },
    { username: 'user',  password: '1234', role: 'user' },
    { username: 'manager', password: '1234', role: 'manager' },
  ];

  constructor() {}

  login(username: string, password: string): boolean {
    const foundUser = this.USERS.find(u => u.username === username && u.password === password);
    if (foundUser) {
      localStorage.setItem('token', 'dummy-token');
      localStorage.setItem('role', foundUser.role);
      this.authState.next(true);
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.authState.next(false);
  }

  getRole(): RoleName | null {
    return localStorage.getItem('role') as RoleName | null;
  }

  isLoggedIn(): Observable<boolean> {
    const tokenExists = this.hasToken();
    if (this.authState.value !== tokenExists) {
      this.authState.next(tokenExists);
    }
    return this.authState.asObservable();
  }
getLoggedInUserRole(): Role | undefined {
  const user = JSON.parse(localStorage.getItem('loggedInUser') || 'null');
  if (!user) return undefined;

  const roles = JSON.parse(localStorage.getItem('roles') || '[]');
  return roles.find((r: Role) => r.id === user.roleId);
}
  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }
}
