import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddHrDialogComponent } from './add-hr/add-hr.component';

const routes: Routes = [
  {
    path:'organization',
    loadChildren: () => import('./organization/organization.module').then((m) => m.OrganizationModule)
  },
  {
    path:'addHr',
    component: AddHrDialogComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OwnerRoutingModule { }
