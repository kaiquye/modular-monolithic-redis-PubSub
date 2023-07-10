import { doc } from 'prettier';

export enum EPersonStatus {
  ACTIVE = 'ACTIVE',
  BLOCKED = 'BLOCKED',
}

export class Person {
  Id: string;
  firstName: string;
  lastName: string;
  email: string;
  document: string;
  password: string;
  status: EPersonStatus;

  constructor(
    firstName: string,
    lastName: string,
    email: string,
    document: string,
    password: string,
    status: EPersonStatus,
    Id?: string,
  ) {
    this.Id = Id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.document = document;
    this.password = password;
  }

  public static Create(fistName: string, lastName = '', email: string, document: string, password: string) {
    const currentStatus = EPersonStatus.ACTIVE;
    return new Person(fistName, lastName, email, document, password, currentStatus);
  }
}
