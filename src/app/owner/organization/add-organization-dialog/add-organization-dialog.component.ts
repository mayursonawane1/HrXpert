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
  @Input() visible = false;
  @Output() visibleChange = new EventEmitter<boolean>();

  /** If non-null, we're editing instead of creating */
  @Input() organization: OrganizationList | null = null;

  /** Notify parent that save (create or update) succeeded */
  @Output() saveComplete = new EventEmitter<void>();

  orgForm!: FormGroup;
  title = 'Add Organization';

  constructor(
    private fb: FormBuilder,
    private orgService: OrganizationService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.orgForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNo: ['', Validators.required],
      city: ['', Validators.required],
    });
  }

  ngOnChanges(changes: SimpleChanges) {
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
      } else {
        this.title = 'Add Organization';
        this.orgForm.reset();
      }
    }

    // If dialog just closed, clear form
    if (changes['visible'] && !this.visible) {
      this.orgForm.reset();
    }
  }

  onDialogClose() {
    this.visibleChange.emit(false);
  }

  save() {
    if (this.orgForm.invalid) {
      this.orgForm.markAllAsTouched();
      return;
    }

    const payload: Organization = this.orgForm.value;

    if (this.organization) {
      // ---- UPDATE MODE ----
      this.orgService
        .updateOrganization(this.organization._id, payload)
        .subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Updated',
              detail: `Organization "${payload.name}" updated.`,
            });
            this.visibleChange.emit(false);
            this.saveComplete.emit();
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: err.error?.message || 'Failed to update organization.',
            });
          },
        });
    } else {
      // ---- CREATE MODE ----
      this.orgService.createOrganization(payload).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Created',
            detail: `Organization "${payload.name}" created.`,
          });
          this.visibleChange.emit(false);
          this.saveComplete.emit();
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: err.error?.message || 'Failed to create organization.',
          });
        },
      });
    }
  }
}
