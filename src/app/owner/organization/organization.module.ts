import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizationRoutingModule } from './organization-routing.module';
import { AddHrComponent } from '../add-hr/add-hr.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddHrComponent
  ],
  imports: [
    CommonModule,
    OrganizationRoutingModule,
    ReactiveFormsModule
  ]
})
export class OrganizationModule { }
