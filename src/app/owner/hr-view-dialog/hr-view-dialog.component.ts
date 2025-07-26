import { Component, Input, OnChanges } from '@angular/core';
import { HrService } from '../services/hr.service'; // hypothetical service

@Component({
  selector: 'app-hr-view-dialog',
  templateUrl: './hr-view-dialog.component.html',
})
export class HrViewDialogComponent implements OnChanges {
  @Input() orgId!: string;
  hrList: any[] = [];

  constructor(private hrService: HrService) {}

  ngOnChanges(): void {
    if (this.orgId) {
      this.hrService.getHrsByOrgId(this.orgId).subscribe({
        next: (res) => (this.hrList = res),
        error: () => (this.hrList = []),
      });
    }
  }
}
