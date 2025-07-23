import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-hr-dialog',
  templateUrl: './add-hr.component.html',
  styleUrls: ['./add-hr.component.scss']
})
export class AddHrDialogComponent implements OnInit {
  @Input() organization: any;
@Output() hrAdded = new EventEmitter<void>();
@Output() cancel = new EventEmitter<void>();

  hrForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.hrForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNo: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  save(): void {
    if (this.hrForm.invalid) {
      this.hrForm.markAllAsTouched();
      return;
    }

    const payload = this.hrForm.value;
    console.log('HR payload:', payload);
    // Call API here
  }
}
