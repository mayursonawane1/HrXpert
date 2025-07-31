import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrganizationService } from '../services/organization.service';
import { MessageService } from 'primeng/api';
import { OrganizationList, Organization } from '../models/organization.model';

@Component({
  selector: 'app-add-organization-dialog',
  templateUrl: './add-organization-dialog.component.html',
  styleUrls: ['./add-organization-dialog.component.scss'],
})
export class AddOrganizationDialogComponent implements OnInit, OnChanges {
  logoPreview: string | null = null;
  logoBase64: string | null = null;
  isUploading = false;
  selectedFileName: string | null = null;

  @Input() visible = false;
  @Output() visibleChange = new EventEmitter<boolean>();

  /** If non-null, we're editing instead of creating */
  @Input() organization: OrganizationList | null = null;

  /** Notify parent that save (create or update) succeeded */
  @Output() saveComplete = new EventEmitter<void>();

  orgForm!: FormGroup;
  title = 'Add Organization';
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private orgService: OrganizationService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.orgForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNo: ['', [Validators.required, Validators.pattern(/^\+?[\d\s\-\(\)]+$/)]],
      city: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['visible'] && !this.visible) {
      this.resetForm();
    }

    if (!this.orgForm) return;

    if (changes['organization']) {
      if (this.organization) {
        this.title = 'Edit Organization';
        this.orgForm.patchValue({
          name: this.organization.name,
          email: this.organization.email,
          phoneNo: this.organization.phoneNo,
          city: this.organization.city,
        });
        // Load existing logo if available
        if (this.organization.logo) {
          this.logoPreview = this.organization.logo;
          this.logoBase64 = this.organization.logo;
        }
      } else {
        this.title = 'Add Organization';
        this.resetForm();
      }
    }
  }

  resetForm() {
    this.orgForm?.reset();
    this.logoBase64 = null;
    this.logoPreview = null;
    this.selectedFileName = null;
    this.isSubmitting = false;
    this.isUploading = false;
  }

  onDialogClose() {
    this.visibleChange.emit(false);
  }

  onLogoSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'File size must be less than 5MB.',
        });
        return;
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Please select a valid image file.',
        });
        return;
      }

      this.isUploading = true;
      this.selectedFileName = file.name;
      
      const reader = new FileReader();
      reader.onload = () => {
        this.logoBase64 = reader.result as string;
        this.logoPreview = this.logoBase64;
        this.isUploading = false;
      };
      reader.onerror = () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to read the image file.',
        });
        this.isUploading = false;
      };
      reader.readAsDataURL(file);
    }
  }

  removeLogo() {
    this.logoBase64 = null;
    this.logoPreview = null;
    this.selectedFileName = null;
    // Clear the file input
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  getFieldError(fieldName: string): string | null {
    const field = this.orgForm.get(fieldName);
    if (field?.touched && field?.errors) {
      if (field.errors['required']) return `${fieldName} is required.`;
      if (field.errors['email']) return 'Invalid email format.';
      if (field.errors['minlength']) return `${fieldName} must be at least ${field.errors['minlength'].requiredLength} characters.`;
      if (field.errors['pattern']) return 'Invalid phone number format.';
    }
    return null;
  }

  save() {
    if (this.orgForm.invalid) {
      this.orgForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    const payload: any = { ...this.orgForm.value };

    if (this.logoBase64) {
      payload.logo = this.logoBase64;
    }

    const operation$ = this.organization
      ? this.orgService.updateOrganization(this.organization._id, payload)
      : this.orgService.createOrganization(payload);

    operation$.subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: this.organization ? 'Updated' : 'Created',
          detail: `Organization "${payload.name}" ${this.organization ? 'updated' : 'created'} successfully.`,
        });
        this.visibleChange.emit(false);
        this.saveComplete.emit();
        this.isSubmitting = false;
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.error?.message || `Failed to ${this.organization ? 'update' : 'create'} organization.`,
        });
        this.isSubmitting = false;
      },
    });
  }
}