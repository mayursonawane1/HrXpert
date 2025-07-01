import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutComponent } from './layout/layout.component'; // 👈 new
import { authGuard } from './core/auth.guard';

const routes: Routes = [
  // Public login page
  { path: 'login', component: LoginComponent },

  // Protected layout + children
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    data: { roles: ['owner'] },
    children: [
      { path: 'dashboard', component: DashboardComponent },

      // ✅ Lazy load Employee Management inside layout
      {
        path: 'hr',
        loadChildren: () =>
          import('./hr/hr.module')
            .then(m => m.HrModule)
      },

      // You can add more protected children here...
    ]
  },

  // Wildcard redirect
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
