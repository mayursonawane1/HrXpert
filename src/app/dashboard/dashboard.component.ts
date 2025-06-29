
import { Component, ViewChild } from '@angular/core';
import { Sidebar } from 'primeng/sidebar';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
 sidebarVisible: boolean = false;

  activeSection: string | null = null;
  activeSubmenu: string | null = null;

  toggleSection(section: string): void {
    this.activeSection = this.activeSection === section ? null : section;
    // Reset submenu when section changes
    this.activeSubmenu = null;
  }

  toggleSubmenu(menu: string): void {
    this.activeSubmenu = this.activeSubmenu === menu ? null : menu;
  }

  closeCallback(event: Event): void {
    this.sidebarVisible = false;
  }
}

