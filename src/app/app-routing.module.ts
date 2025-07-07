import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutComponent } from './layout/layout.component'; // 👈 new
import { authGuard } from './core/auth.guard';
import { OwnerDashboardComponent } from './owner-dashboard/owner-dashboard.component';

const routes: Routes = [
  // Public login page
  { path: 'login', component: LoginComponent },

  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    data: { roles: ['owner'] },
    children: [
      { path: 'dashboard', component: OwnerDashboardComponent },
      {
        path: 'owner',
        loadChildren: () => import('./owner/owner.module').then((m) => m.OwnerModule),
      },
    ],
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    data: { roles: ['hr', 'owner'] },
    children: [
      { path: 'dashboard', component: DashboardComponent },
      {
        path: 'hr',
        loadChildren: () => import('./hr/hr.module').then((m) => m.HrModule),
      },
    ],
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    data: { roles: ['employee'] },
    children: [
      { path: 'dashboard', component: DashboardComponent },
      {
        path: 'employee',
        loadChildren: () => import('./employee/employee.module').then((m) => m.EmployeeModule),
      },
    ],
  },

  // Wildcard redirect
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
