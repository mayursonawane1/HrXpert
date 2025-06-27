import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common'; // Import `isPlatformBrowser`
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private api = environment.apiBaseUrl;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: any // Inject PLATFORM_ID to detect the platform
  ) {}

  login(credentials: { userName: string; password: string }) {
    const payload = {
      email: credentials.userName,
      password: credentials.password,
    };
    return this.http.post<{ message: string; user: any }>(`${this.api}/auth/login`, payload);
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
      return user?.role ?? null; // Return the role of the logged-in user
    }
    return null; // Return null if not in the browser
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
    }
  }

  // Helper method to get the user from localStorage
  getUser() {
    if (isPlatformBrowser(this.platformId)) {
      return JSON.parse(localStorage.getItem('user') || '{}');
    }
    return {}; // Return empty object if not in the browser
  }
}
