import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class HrService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  // Create new HR
  createHr(data: any, token: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post(`${this.baseUrl}/hr/createHr`, data, { headers });
  }

  // (Optional) Update existing HR
  updateHr(id: string, data: any, token: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.put(`${this.baseUrl}/hr/${id}`, data, { headers });
  }
}
