import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './common/login/login.component';
import { DashboardComponent } from './dashboards/dashboard/dashboard.component';
import { LayoutComponent } from './common/layout/layout.component';
import { authGuard } from './core/auth.guard';
import { OwnerDashboardComponent } from './dashboards/owner-dashboard/owner-dashboard.component';

const routes: Routes = [
  // Public login page
  { path: 'login', component: LoginComponent },

  // OWNER routes
  {
    path: 'owner',
    component: LayoutComponent,
    canActivate: [authGuard],
    data: { roles: ['owner'] },
    children: [
      { path: 'dashboard', component: OwnerDashboardComponent },
      {
        path: '',
        loadChildren: () =>
          import('./owner/owner.module').then((m) => m.OwnerModule),
      },
    ],
  },

  // HR routes
  {
    path: 'hr',
    component: LayoutComponent,
    canActivate: [authGuard],
    data: { roles: ['hr'] },
    children: [
      { path: 'dashboard', component: DashboardComponent },
      {
        path: '',
        loadChildren: () =>
          import('./hr/hr.module').then((m) => m.HrModule),
      },
    ],
  },

  // EMPLOYEE routes
  {
    path: 'employee',
    component: LayoutComponent,
    canActivate: [authGuard],
    data: { roles: ['employee'] },
    children: [
      { path: 'dashboard', component: DashboardComponent },
      {
        path: '',
        loadChildren: () =>
          import('./employee/employee.module').then((m) => m.EmployeeModule),
      },
    ],
  },

  // Wildcard fallback
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
