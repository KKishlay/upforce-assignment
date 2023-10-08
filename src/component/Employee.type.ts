export interface IEmployee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  selectedState: string;
  selectedCity: string;
}

export enum PageEnum {
  list,
  add,
  edit,
}
