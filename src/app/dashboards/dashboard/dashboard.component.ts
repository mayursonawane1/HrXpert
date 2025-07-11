import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  orgDialogVisible: boolean = false;

  ngOnInit() {
    console.log('Dashboard initialized');
  }

  showOrgDialog() {
    this.orgDialogVisible = true;
  }
}
