import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { EmployeeService } from '../services/employee.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Employee } from '../models/employee.model';
import { EmployeeTypeOption, WorkLocationOption, DropdownOption } from '../models/employee.model';
@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.scss',
})
export class AddEmployeeComponent implements OnInit {
  // For password visibility toggle
  showPassword = false;
  hoverEye = false;

  // Dropdown selected values
  selectedEmployeeStatus: DropdownOption | null = null;
  selectedEmployeeType: EmployeeTypeOption | null = null;
  selectedWorkLocation: WorkLocationOption | null = null;

  // Breadcrumbs
  breadcrumbItems: MenuItem[] = [];
  items: MenuItem[] = [];
  home!: MenuItem;

  // Photo preview
  imagePreview: string | ArrayBuffer | null = null;

  // Dropdown data
  employeeTypes: EmployeeTypeOption[] = [
    { name: 'Full Time', code: 'FT' },
    { name: 'Part Time', code: 'PT' },
    { name: 'Intern', code: 'IN' },
  ];

  workLocations: WorkLocationOption[] = [
    { name: 'Hybrid', code: 'HY' },
    { name: 'Work From Home', code: 'WFH' },
    { name: 'Work From Office', code: 'WFO' },
  ];

  employeeStatuses: DropdownOption[] = [
    { label: 'Active', value: 'active' },
    { label: 'Inactive', value: 'inactive' },
  ];

  // Employee form model
  employee: Employee = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    employeeType: '',
    workLocation: '',
    dateOfJoining: null,
    employeeStatus: '',
    orgId: '',
    hrId: '',
  };

  constructor(
    private employeeService: EmployeeService,
    private authService: AuthService, // To get logged-in user info
    public router: Router
  ) {}

  ngOnInit(): void {
    // Setup breadcrumbs
    this.home = { icon: 'pi pi-home', routerLink: '/dashboard' };
    this.items = [{ label: 'Add Employee', styleClass: 'text-dark fw-bold' }];

    // ✅ Get orgId and hrId from logged-in user
    const currentUser = this.authService.getUser();
    this.employee.orgId = currentUser?.orgId || '';
    this.employee.hrId = currentUser?._id || '';

    if (!this.employee.orgId || !this.employee.hrId) {
      console.error('Missing orgId or hrId for the current user.');
      alert('You are not associated with any organization. Cannot create employee.');
      this.router.navigate(['/dashboard']); // Redirect
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  saveEmployee(): void {
    // Populate dropdown selected values into the model
    this.employee.employeeType = this.selectedEmployeeType?.name || '';
    this.employee.workLocation = this.selectedWorkLocation?.name || '';
    this.employee.employeeStatus = this.selectedEmployeeStatus?.value || '';

    // Format date to yyyy-mm-dd
    const formattedDate = this.employee.dateOfJoining
      ? new Date(this.employee.dateOfJoining).toISOString().split('T')[0]
      : '';

    const payload = {
      ...this.employee,
      dateOfJoining: formattedDate
    };

    console.log('Payload being sent:', payload); // For debugging

    this.employeeService.createEmployee(payload).subscribe({
      next: (response) => {
        console.log('Employee created successfully:', response);
        alert('Employee created successfully!');
        this.router.navigate(['/employees']);
      },
      error: (error) => {
        console.error('Error creating employee:', error);
        alert('Failed to create employee. Please check all fields.');
      }
    });
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
    const fileInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }
}