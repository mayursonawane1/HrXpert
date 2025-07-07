import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HrRoutingModule } from './hr-routing.module'; 
import { EmployeeManagementModule } from './employee-management/employee-management.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HrRoutingModule,
    EmployeeManagementModule
  ]
})
export class HrModule { }
