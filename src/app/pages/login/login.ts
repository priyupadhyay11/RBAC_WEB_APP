import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServices } from '../../services/auth.services';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  loginForm!: FormGroup;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private auth: AuthServices,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  get f() {
    return this.loginForm.controls;
  }
onSubmit() {
  if (this.loginForm.invalid) return;

  const { username, password } = this.loginForm.value;
  const success = this.auth.login(username!, password!);

  if (success) {
    const role = this.auth.getRole();

    if (role === 'admin') {
      this.router.navigateByUrl('/dashboard').then(result =>
        console.log('Navigation result:', result)
      );
    } else if (role === 'user') {
      this.router.navigate(['/users']); 
    } else if (role === 'manager') {
      this.router.navigate(['/roles']);
    } else {
      this.router.navigate(['/login']); 
    }

  } else {
    this.errorMessage = 'Invalid username or password';
  }
}

  }

