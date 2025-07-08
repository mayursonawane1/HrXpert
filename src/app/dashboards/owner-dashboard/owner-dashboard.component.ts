import { Component, OnInit } from '@angular/core';
import { OrganizationService } from '../../owner/organization/services/organization.service';
import { OrganizationList } from '../../owner/organization/models/organization.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-owner-dashboard',
  templateUrl: './owner-dashboard.component.html',
  styleUrls: ['./owner-dashboard.component.scss'],
})
export class OwnerDashboardComponent implements OnInit {
  orgDialogVisible = false;
  organizations: OrganizationList[] = [];
  selectedOrg: OrganizationList | null = null;

  constructor(
    private organizationService: OrganizationService,
    private router: Router // Inject the Router service
  ) {}

  ngOnInit() {
    this.getAllOrganizations();
  }

  getAllOrganizations() {
    this.organizationService
      .getAllOrganizations()
      .subscribe((data) => (this.organizations = data));
  }

  // "Add Organization" button
  showOrgDialog() {
    this.selectedOrg = null;        // clear edit
    this.orgDialogVisible = true;   // open dialog
  }

  // Pencil button (edit organization)
  editOrganization(org: OrganizationList) {
    this.selectedOrg = org;
    this.orgDialogVisible = true;
  }

  // Delete organization
  deleteOrganization(id: string) {
    this.organizationService.deleteOrganization(id).subscribe(() => {
      this.getAllOrganizations();
    });
  }

  // Dialog (both add & edit) emits this when it closes
  onDialogHide() {
    this.orgDialogVisible = false;
  }

  // Dialog emits this after a successful create/update
  onDialogSave() {
    this.getAllOrganizations();
  }

  // Navigate to 'owner/addHr' with _id
  addHr(orgId: string) {
    this.router.navigate([`/owner/addHr`, orgId]); // Routes to 'owner/addHr/_id'
  }
}
