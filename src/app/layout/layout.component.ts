import { Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
 sidebarVisible: boolean = true;
 isEmployeeOpen = false;
isCoreOpen = true;
isApplicationOpen = false;

 sectionState = {
  core: true,
  application: false,
  reports: false
};
}
