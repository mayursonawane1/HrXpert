import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-hr',
  templateUrl: './add-hr.component.html',
  styleUrl: './add-hr.component.scss'
})
export class AddHrComponent {

  hrForm: FormGroup;
  hrList:any[] = [];

  constructor(
    private fb: FormBuilder
  ) {
    this.hrForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNo: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

    save() {
      if (this.hrForm.invalid) {
        this.hrForm.markAllAsTouched();
        return;
      }

      const payload: any = this.hrForm.value;

      // if (this.hrList.length) {
      //   // ---- UPDATE MODE ----
      //   this.orgService
      //     .updateOrganization(this.hrList._id, payload)
      //     .subscribe({
      //       next: () => {
      //         this.messageService.add({
      //           severity: 'success',
      //           summary: 'Updated',
      //           detail: `Organization "${payload.name}" updated.`,
      //         });
      //       },
      //       error: (err) => {
      //         this.messageService.add({
      //           severity: 'error',
      //           summary: 'Error',
      //           detail:
      //             err.error?.message ||
      //             'Failed to update organization.',
      //         });
      //       },
      //     });
      // } else {
      //   // ---- CREATE MODE ----
      //   this.orgService.createOrganization(payload).subscribe({
      //     next: () => {
      //       this.messageService.add({
      //         severity: 'success',
      //         summary: 'Created',
      //         detail: `Organization "${payload.name}" created.`,
      //       });
      //     },
      //     error: (err) => {
      //       this.messageService.add({
      //         severity: 'error',
      //         summary: 'Error',
      //         detail:
      //           err.error?.message ||
      //           'Failed to create organization.',
      //       });
      //     },
      //   });
      // }
    }
}
