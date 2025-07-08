import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HrRoutingModule } from './hr-routing.module'; 
import { EmployeeManagementModule } from './employee-management/employee-management.module';
import { CardModule } from 'primeng/card';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HrRoutingModule,
    EmployeeManagementModule,
    CardModule
  ]
})
export class HrModule { }
