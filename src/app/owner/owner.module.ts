import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OwnerRoutingModule } from './owner-routing.module';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SkeletonModule } from 'primeng/skeleton'
import { HrViewDialogComponent } from './hr-view-dialog/hr-view-dialog.component';
import { AddHrDialogComponent } from './add-hr/add-hr.component';
import { AddOrganizationDialogComponent } from './organization/add-organization-dialog/add-organization-dialog.component';
import { OwnerDashboardComponent } from '../dashboards/owner-dashboard/owner-dashboard.component';

@NgModule({
  declarations: [
    HrViewDialogComponent,
    AddHrDialogComponent,
    AddOrganizationDialogComponent,
    OwnerDashboardComponent,
  ],
  imports: [
    CommonModule,
    OwnerRoutingModule,
    DialogModule,
    SkeletonModule,
    TableModule,
    ButtonModule,
    CardModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [] // Add components here if other modules need them
})
export class OwnerModule {}
