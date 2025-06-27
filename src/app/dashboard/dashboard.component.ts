import { Component } from '@angular/core';
import { TableComponent } from '../table/table.component';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'dashboard-ng19-dashboard',
  imports: [ TableComponent, ButtonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
}
