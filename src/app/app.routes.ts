import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TableComponent } from './table/table.component';
import { ChartsComponent } from './charts/charts.component';
import { HelloComponent } from './hello/hello.component';
import { LoginComponent } from './login/login.component'; // 👈

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'charts',
    component: ChartsComponent
  },
  {
    path: 'tables',
    component: TableComponent
  },
  {
    path: 'hello',
    component: HelloComponent
  }
];
