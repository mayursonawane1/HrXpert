import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.scss'
})
export class AddEmployeeComponent implements OnInit {
  showPassword: boolean = false;
  hoverEye: boolean = false;
  selectedEmployeeStatus: any = null;
  selectedEmployeeType: any = null;
  selectedWorkLocation: any = null;
  breadcrumbItems: MenuItem[] = [];
   items: MenuItem[] = [];
  home!: MenuItem;
  imagePreview: string | ArrayBuffer | null = null;
  employeeStatuses = [
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'inactive' }
];
  employeeTypes = [
    { name: 'Full Time', code: 'FT' },
    { name: 'Part Time', code: 'PT' },
    { name: 'Intern', code: 'IN' }
  ];

  workLocations = [
    { name: 'Hybrid', code: 'HY' },
    { name: 'Work From Home', code: 'WFH' },
    { name: 'Work From Office', code: 'WFO' }
  ];

  employee = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    employeeType: '',
    workLocation: '',
     dateOfJoining: null
  };

  ngOnInit(): void {
    this.home = { icon: 'pi pi-home', routerLink: '/dashboard' };
    this.items = [
      { label: 'Add Employee', styleClass: 'text-dark fw-bold' }
    ];
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  saveEmployee() {
    this.employee.employeeType = this.selectedEmployeeType?.name || '';
    this.employee.workLocation = this.selectedWorkLocation?.name || '';

  }
  onImageSelected(event: any): void {
  const file: File = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }
}
removeImage(): void {
  this.imagePreview = null;
  const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
  if (fileInput) {
    fileInput.value = '';
  }
}

}
