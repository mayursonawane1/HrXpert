import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private api = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  login(credentials: { userName: string; password: string }) {
    const payload = {
      email: credentials.userName,
      password: credentials.password
    };
    return this.http.post<{ token: string }>(`${this.api}/auth/login`, payload);
  }
}
