import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NgIf } from '@angular/common'; // ✅ Import this

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SidebarComponent, NavbarComponent, RouterOutlet, NgIf], 
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Dashboard in bootstrap 5';
  isSidebarOpen = true;

  constructor(public router: Router) {}

  onSidebarToggle() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  isLoginRoute(): boolean {
    return this.router.url === '/login';
  }
}
