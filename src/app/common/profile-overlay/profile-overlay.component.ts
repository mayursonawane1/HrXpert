import { Component, ViewChild } from '@angular/core';
import { OverlayPanel } from 'primeng/overlaypanel';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile-overlay',
  templateUrl: './profile-overlay.component.html',
  styleUrls: ['./profile-overlay.component.scss']
})
export class ProfileOverlayComponent {
 @ViewChild('op') overlayPanel!: OverlayPanel;

  constructor(private router: Router, private authService :AuthService) {}

 show(event: Event) {
  setTimeout(() => {
    this.overlayPanel.toggle(event);
  }, 0);
}
  viewProfile() {
    this.router.navigate(['/profile']);
    this.overlayPanel.hide();
  }

 logout() {
  this.authService.logout();
}
}
