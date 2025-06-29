import { Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
 sidebarVisible: boolean = true;
 sectionState = {
  core: true,
  application: false,
  reports: false
};
}
