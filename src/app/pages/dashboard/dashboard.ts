import { Component } from '@angular/core';
import { AuthServices } from '../../services/auth.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
   user: any;
  constructor(private auth: AuthServices, private router: Router) {}

  logout() {
    this.auth.logout();
    this.user= null;
    this.router.navigate(['/login']);
  }
    usersboard(){
    this.router.navigate(['/users']);
  }
    rolePage() {
    this.router.navigate(['/roles']);
  }
}
