import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { MENU_CONFIG, MenuItem } from '../../../menu-config';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  animations: [
    trigger('slideToggle', [
      state(
        'collapsed',
        style({
          height: '0px',
          opacity: 0,
          overflow: 'hidden',
        })
      ),
      state(
        'expanded',
        style({
          height: '*',
          opacity: 1,
          overflow: 'hidden',
        })
      ),
      transition('collapsed <=> expanded', [animate('300ms ease-in-out')]),
    ]),
  ],
})
export class LayoutComponent implements OnInit {
  sidebarVisible: boolean = true;
  menuItems: MenuItem[] = [];
  userRole: string | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.userRole = this.authService.getUserRole();
    this.menuItems = this.filterMenuItemsByRole(MENU_CONFIG, this.userRole);
  }

  toggleSection(section: MenuItem) {
    section.expanded = !section.expanded;
  }

  toggleSubmenu(item: MenuItem) {
    item.expanded = !item.expanded;
  }

  // ✅ Filter menu items based on user role
  filterMenuItemsByRole(items: MenuItem[], role: string | null): MenuItem[] {
    return items
      .filter((item) => !item.roles || item.roles.includes(role!)) // Filter top-level
      .map((item) => ({
        ...item,
        children: item.children
          ? this.filterMenuItemsByRole(item.children, role) // Filter children recursively
          : undefined,
      }));
  }

   logout() {
  this.authService.logout();
}
}
