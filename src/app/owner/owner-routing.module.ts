import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddHrComponent } from './add-hr/add-hr.component';

const routes: Routes = [
  {
    path:'organization',
    loadChildren: () => import('./organization/organization.module').then((m) => m.OrganizationModule)
  },
  {
    path:'addHr/:id',
    component: AddHrComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OwnerRoutingModule { }
