import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api'; // If you are using PrimeNG's MessageService
import { HrService } from '../service/hr.service';

@Component({
  selector: 'app-add-hr',
  templateUrl: './add-hr.component.html',
  styleUrls: ['./add-hr.component.scss'],
})
export class AddHrComponent implements OnInit {
  hrForm: FormGroup;
  orgId: string | null = null; // Store the orgId passed from the URL

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute, // To get route parameters like orgId
    private hrService: HrService, // HR service to interact with the backend
    private messageService: MessageService // For showing messages
  ) {
    // Initialize the form
    this.hrForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // Get the organization ID from the route parameters
    this.route.paramMap.subscribe((params) => {
      this.orgId = params.get('id'); // Getting orgId if available from URL
    });

    // If editing, populate the form with existing HR data (you can call an API to fetch HR data by ID)
    // if (this.orgId) {
    //   this.loadHrDetails(this.orgId);
    // }
  }

  // Fetch HR details if in edit mode (this function needs to interact with your backend service)
  // loadHrDetails(id: string) {
  //   this.hrService.getHrById(id).subscribe(
  //     (data) => {
  //       this.hrForm.patchValue(data);  // Populate the form with existing data
  //     },
  //     (error) => {
  //       this.messageService.add({
  //         severity: 'error',
  //         summary: 'Error loading HR data',
  //         detail: error.message || 'Unable to fetch HR details.',
  //       });
  //     }
  //   );
  // }

  // Save HR function to handle both create and update
  save() {
    if (this.hrForm.invalid) {
      this.hrForm.markAllAsTouched();
      return;
    }

    const payload = this.hrForm.value;
    if (this.orgId) {
      payload.orgId = this.orgId; // Add orgId to the payload if it's available
    }

    // Check if we are in "edit mode" by checking if orgId is available
    if (this.orgId) {
      // ---- UPDATE MODE ----
      this.hrService.createHr(payload).subscribe(
        () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Created',
            detail: `HR data created successfully.`,
          });
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error.message || 'Failed to update HR.',
          });
        }
      );
    }
    // else {
    //   // ---- CREATE MODE ----
    //   this.hrService.createHr(payload).subscribe(
    //     () => {
    //       this.messageService.add({
    //         severity: 'success',
    //         summary: 'Created',
    //         detail: `HR data created successfully.`,
    //       });
    //     },
    //     (error) => {
    //       this.messageService.add({
    //         severity: 'error',
    //         summary: 'Error',
    //         detail: error.message || 'Failed to create HR.',
    //       });
    //     }
    //   );
    // }
  }
}
