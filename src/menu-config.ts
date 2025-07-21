// src/app/config/menu-config.ts

export interface MenuItem {
  label: string;
  icon?: string;
  routerLink?: string;
  badge?: string | number;
  expanded?: boolean; // whether the section/submenu is open by default
  children?: MenuItem[];
  roles?: string[];
}

export const MENU_CONFIG: MenuItem[] = [
  {
    label: 'CORE',
    expanded: true, 
    children: [
      {
        label: 'Dashboard',
        icon: 'pi pi-home',
        routerLink: '/dashboard',
      },
      {
        label: 'Bookmarks',
        icon: 'pi pi-bookmark',
        routerLink: '/bookmarks',
      },
      {
        label: 'Employee Management',
        icon: 'pi pi-chart-line me-2',
        expanded: false,
        children: [
          {
            label: 'Add Employee',
            icon: 'fa-solid fa-plus',
            routerLink: '/hr/employee-management/add',
            roles: ['owner','hr']
          },
          {
            label: 'Search',
            icon: 'pi pi-search',
            routerLink: '/hr/employee-management/search',
          },
        ],
      },
      {
        label: 'Team',
        icon: 'pi pi-users',
        routerLink: '/team',
      },
      {
        label: 'Messages',
        icon: 'pi pi-comments',
        routerLink: '/messages',
        badge: 3,
      },
      {
        label: 'Calendar',
        icon: 'pi pi-calendar',
        routerLink: '/calendar',
      },
    ],
  },
  {
    label: 'APPLICATION',
    expanded: false,
    children: [
      {
        label: 'Projects',
        icon: 'pi pi-folder',
        routerLink: '/projects',
      },
      {
        label: 'Performance',
        icon: 'pi pi-chart-bar',
        routerLink: '/performance',
      },
    ],
  },
];
