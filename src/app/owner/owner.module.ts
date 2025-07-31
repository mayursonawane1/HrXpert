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
import { AddOrganizationDialogComponent } from './organization/add-organization-dialog/add-organization-dialog.component';
import { OwnerDashboardComponent } from '../dashboards/owner-dashboard/owner-dashboard.component';
import { HrRegistrationDialogComponent } from '../dashboards/hr-registration-dialog/hr-registration-dialog.component';
import { PasswordModule } from 'primeng/password';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
  declarations: [
    HrViewDialogComponent,
    AddOrganizationDialogComponent,
    OwnerDashboardComponent,
    HrRegistrationDialogComponent
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
    ReactiveFormsModule,
    PasswordModule,
    TooltipModule
  ],
  exports: [] // Add components here if other modules need them
})
export class OwnerModule {}
