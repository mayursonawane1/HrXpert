import { Component, OnInit } from '@angular/core';
import { OrganizationService } from '../../owner/organization/services/organization.service';
import { OrganizationList } from '../../owner/organization/models/organization.model';

@Component({
  selector: 'app-owner-dashboard',
  templateUrl: './owner-dashboard.component.html',
  styleUrls: ['./owner-dashboard.component.scss'],
})
export class OwnerDashboardComponent implements OnInit {
  orgDialogVisible = false;
  organizations: OrganizationList[] = [];
  selectedOrg: OrganizationList | null = null;

  constructor(private organizationService: OrganizationService) {}

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

  // pencil button
  editOrganization(org: OrganizationList) {
    this.selectedOrg = org;
    this.orgDialogVisible = true;
  }

  deleteOrganization(id: string) {
    this.organizationService.deleteOrganization(id).subscribe(() => {
      this.getAllOrganizations();
    });
  }

  // dialog (both add & edit) emits this when it closes
  onDialogHide() {
    this.orgDialogVisible = false;
  }

  // dialog emits this after a successful create/update
  onDialogSave() {
    this.getAllOrganizations();
  }
}
