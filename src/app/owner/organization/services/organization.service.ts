import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environment/environment';
import { Organization } from '../models/organization.model';


@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  createOrganization(data: Organization) {
    return this.http.post(`${this.baseUrl}/org/createOrg`, data);
  }
}
