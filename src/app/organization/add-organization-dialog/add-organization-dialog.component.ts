import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OrganizationService } from './services/organization.service';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../services/auth.service';
import { Organization } from './models/organization.model';

@Component({
  selector: 'app-add-organization-dialog',
  templateUrl: './add-organization-dialog.component.html',
  styleUrl: './add-organization-dialog.component.scss'
})
export class AddOrganizationDialogComponent {
  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();

  organization = {
    name: '',
    email: '',
    phoneNo: '',
    city: ''
  };

  constructor(
    private orgService: OrganizationService,
    private authService: AuthService,
   private messageService: MessageService,
  ) {}

  onDialogClose() {
    this.visibleChange.emit(false);
  }

 save() {
  const token = this.authService.getToken();
  if (!token) {
    this.messageService.add({ severity: 'error', summary: 'Unauthorized', detail: 'No token found.' });
    return;
  }

  this.orgService.createOrganization(this.organization, token).subscribe({
    next: () => {
      this.messageService.add({ severity: 'success', summary: 'Success',detail: `The organization "${this.organization.name}" has been added successfully.`,
 });
      this.visible = false;
      this.visibleChange.emit(false);
      this.organization = { name: '', email: '', phoneNo: '', city: '' }; 
    },
    error: () => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to Create Organization' });
    }
  });
}

}