export interface Address {
  city: string;
  street: string;
  zipCode: number;
  houseNumber: string;
}

export interface Customer {
  fullName: string;
  email: string;
  address: Address;
  id?: number;
}
