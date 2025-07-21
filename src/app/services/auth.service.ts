import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../environment/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private api = environment.apiBaseUrl;

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  login(credentials: { userName: string; password: string }) {
    const payload = {
      email: credentials.userName,
      password: credentials.password,
    };
    return this.http.post<{ message: string; user: any }>(
      `${this.api}/auth/login`,
      payload
    );
  }

  isAuthenticated(): boolean {
    // Check if running in the browser before using `localStorage`
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      return token !== null && token !== undefined && token !== '';
    }
    return false; // Return false if not in the browser
  }

 getUserRole(): string | null {
  if (isPlatformBrowser(this.platformId)) {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user?.role ?? null;
  }
  return null;
}

isOwner(): boolean {
  return this.getUserRole() === 'owner';
}

isHR(): boolean {
  return this.getUserRole() === 'hr';
}

isEmployee(): boolean {
  return this.getUserRole() === 'employee';
}

 logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');

      // Redirect to login or home
      this.router.navigate(['/login']);
    }
  }

  // Helper method to get the user from localStorage
  getUser() {
    if (isPlatformBrowser(this.platformId)) {
      return JSON.parse(localStorage.getItem('user') || '{}');
    }
    return {}; // Return empty object if not in the browser
  }
  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('authToken');
    }
    return null;
  }
}
