import { Injectable, signal } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserServices {
  private users: User[] = [];

  constructor() {
    const savedUsers = localStorage.getItem('users');
    if (savedUsers) this.users = JSON.parse(savedUsers);
  }
  private storageKey = 'users';
  getUsers(): User[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  saveUsers(users: User[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(users));
  }


  addUser(user: User) {
    this.users.push(user);
    this.save();
  }

  updateUser(index: number, user: User) {
    this.users[index] = user;
    this.save();
  }

  deleteUser(index: number) {
    this.users.splice(index, 1);
    this.save();
  }

  private save() {
    localStorage.setItem('users', JSON.stringify(this.users));
  }
}
