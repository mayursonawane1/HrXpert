import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HrService } from '../../owner/services/hr.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-hr-registration-dialog',
  templateUrl: './hr-registration-dialog.component.html',
  styleUrls: ['./hr-registration-dialog.component.scss'],
})
export class HrRegistrationDialogComponent implements OnInit, OnChanges {
  @Input() orgId: string = '';
  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();

  hrForm: FormGroup;
  title: string = 'Add HR';
  icon: string = '<i class="fa-solid fa-user-plus"></i>'
  constructor(
    private fb: FormBuilder,
    private hrService: HrService,
    private messageService: MessageService
  ) {
    this.hrForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNo: ['', Validators.required],
      password: ['', Validators.required],
      orgId: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.orgId) {
      this.hrForm.patchValue({ orgId: this.orgId });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['visible'] && this.visible) {
      // Dialog just opened – reset form and patch orgId
      this.hrForm.reset();
      this.hrForm.patchValue({ orgId: this.orgId });
    }
  }

  save(): void {
    if (this.hrForm.valid) {
      const hrData = this.hrForm.value;
      const token = 'YOUR_SECRET_TOKEN'; // Replace with actual token handling

      this.hrService.createHr(hrData, token).subscribe({
        next: (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'HR Created',
            detail: 'HR has been successfully added.',
          });
          this.close();
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'An error occurred while creating the HR.',
          });
        },
      });
    }
  }

  close(): void {
    this.visibleChange.emit(false);
  }

  onDialogClose(): void {
    this.visibleChange.emit(false);
  }
}
