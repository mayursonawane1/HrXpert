import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EmployeeManagementRoutingModule } from './employee-management-routing.module';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { Tooltip, TooltipModule } from 'primeng/tooltip';
import { PasswordModule } from 'primeng/password';
@NgModule({
  declarations: [
    AddEmployeeComponent
  ],
  imports: [
    CommonModule,
    EmployeeManagementRoutingModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    CardModule,
    FloatLabelModule,
    DropdownModule,
    CalendarModule,
    BreadcrumbModule,
    TooltipModule,
    PasswordModule
  ]
})
export class EmployeeManagementModule { }
