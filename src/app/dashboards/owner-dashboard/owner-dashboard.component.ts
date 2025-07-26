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
  hrDialogVisible = false; // For Add HR dialog
selectedOrgForHr: any = null; // Org we are adding HR to
hrListDialogVisible = false;
selectedOrgForHrView: any = null;
selectedOrgName: string = '';
loading = true;

  constructor(private organizationService: OrganizationService) {}

  ngOnInit() {
    this.getAllOrganizations();
  }

 getAllOrganizations() {
  this.loading = true; // 🟡 Start loader

  this.organizationService.getAllOrganizations().subscribe({
    next: (data) => {
      this.organizations = data;
      this.loading = false; // ✅ Stop loader
    },
    error: (err) => {
      console.error('Error fetching organizations:', err);
      this.loading = false; // 🟥 Also stop loader on error
    }
  });
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
  
  addHr(org: any): void {
  this.selectedOrgForHr = org; // Set org for HR dialog
  this.hrDialogVisible = true; // Open HR dialog
}
viewHrs(org: any): void {
  this.selectedOrgForHrView = org;
  this.hrListDialogVisible = true;
}

onHrDialogClose() {
  this.hrListDialogVisible = false;
  this.selectedOrgForHrView = null;
  this.selectedOrgName = '';
}
}
