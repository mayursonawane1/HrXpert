import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  signForm: FormGroup;
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.signForm = this.fb.group({
      userName: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  signin(): void {
    if (this.signForm.invalid) return;

    this.authService.login(this.signForm.value).subscribe({
      next: (res: any) => {
        localStorage.setItem('authToken', res.user.token);
        localStorage.setItem('user', JSON.stringify(res.user));

        this.messageService.add({
          severity: 'success', 
          summary: 'Login Successful', 
          detail: 'Welcome to the Dashboard!'
        });

        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.messageService.add({
          severity: 'error', 
          summary: 'Login Failed', 
          detail: 'Invalid credentials, please try again.'
        });
      },
    });
  }
}
