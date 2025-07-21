import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  // Create new employee
  createEmployee(data: any) {
    return this.http.post(`${this.baseUrl}/employee/createEmployee`, data);
  }

  // (Optional) Get all employees
  getAllEmployees() {
    return this.http.get(`${this.baseUrl}/employee`);
  }

  // (Optional) Get employee by ID
  getEmployeeById(id: string) {
    return this.http.get(`${this.baseUrl}/employee/${id}`);
  }

  // (Optional) Update employee
  updateEmployee(id: string, data: any) {
    return this.http.put(`${this.baseUrl}/employee/${id}`, data);
  }

  // (Optional) Delete employee
  deleteEmployee(id: string) {
    return this.http.delete(`${this.baseUrl}/employee/${id}`);
  }
}
