export interface Organization {
  name: string;
  email: string;
  phoneNo: string;
  city: string;
}

export interface OrganizationList {
  _id: string;
  name: string;
  email: string;
  phoneNo: string;
  city: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}