import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';
import { trigger, style, animate, transition, query, stagger, state } from '@angular/animations';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [MessageService],
  animations: [
    trigger('slideInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate('0.6s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('buttonPulse', [
      state('idle', style({ transform: 'scale(1)' })),
      state('loading', style({ transform: 'scale(0.98)' })),
      transition('idle <=> loading', animate('0.2s ease-in-out'))
    ])
  ]
})
export class LoginComponent {
  signForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.signForm = this.fb.group({
      userName: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  signin(): void {
    if (this.signForm.invalid) return;

    this.isLoading = true;

    this.authService.login(this.signForm.value).subscribe({
      next: (res: any) => {
        const user = res.user;
        localStorage.setItem('authToken', user.token);
        localStorage.setItem('user', JSON.stringify(user));

        this.messageService.add({
          severity: 'success',
          summary: 'Login Successful',
          detail: 'Welcome to the Dashboard!'
        });

        this.isLoading = false;

        switch (user.role) {
          case 'owner':
            this.router.navigate(['/owner/dashboard']);
            break;
          case 'hr':
            this.router.navigate(['/hr/dashboard']);
            break;
          case 'employee':
            this.router.navigate(['/employee/dashboard']);
            break;
          default:
            this.router.navigate(['/login']);
        }
      },
      error: () => {
        this.isLoading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Login Failed',
          detail: 'Invalid credentials, please try again.'
        });
      }
    });
  }
}
