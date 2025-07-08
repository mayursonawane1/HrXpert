import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HrService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  createHr(data: any) {
    return this.http.post(`${this.baseUrl}/hr/createHr`, data);
  }

  updateHr(id: string, data: any) {
    return this.http.put(`${this.baseUrl}/hr/${id}`, data);
  }

  getHrById(id: string) {
    return this.http.get(`${this.baseUrl}/hr/${id}`);
  }

  getAllHrs(){
    return this.http.get(`${this.baseUrl}/hr`);
  }

  deleteHr(id: string) {
    return this.http.delete(`${this.baseUrl}/hr/${id}`);
  }
}
