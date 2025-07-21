export interface Employee {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  employeeType: string;
  workLocation: string;
  dateOfJoining: Date | null;
  employeeStatus: string;
  orgId: string;
  hrId: string;
}

export interface DropdownOption {
  label: string;
  value: string;
}

export interface EmployeeTypeOption {
  name: string;
  code: string;
}

export interface WorkLocationOption {
  name: string;
  code: string;
}
