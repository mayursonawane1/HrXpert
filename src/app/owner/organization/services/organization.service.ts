import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environment/environment';
import { Organization, OrganizationList } from '../models/organization.model';

@Injectable({
  providedIn: 'root',
})
export class OrganizationService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  getAllOrganizations() {
    return this.http.get<OrganizationList[]>(`${this.baseUrl}/org`);
  }

  getOrganizationById(id: string) {
    return this.http.get<OrganizationList>(`${this.baseUrl}/org/${id}`);
  }

  createOrganization(data: Organization) {
    return this.http.post(`${this.baseUrl}/org/createOrg`, data);
  }

  updateOrganization(id: string, data: Organization) {
    return this.http.put(`${this.baseUrl}/org/${id}`, data);
  }

  deleteOrganization(id: string) {
    return this.http.delete(`${this.baseUrl}/org/${id}`);
  }
}
