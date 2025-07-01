
import { Component, ViewChild } from '@angular/core';
import { Sidebar } from 'primeng/sidebar';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
 orgDialogVisible: boolean = false;

showOrgDialog() {
  this.orgDialogVisible = true;
}

}

