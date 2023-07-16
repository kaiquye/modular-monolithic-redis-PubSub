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

  static toDomain(data: Partial<Person>): Person {
    return Person.Create(data.firstName, data.lastName, data.email, data.document, data.password);
  }

  static toView(data: Person): Partial<Person> {
    return undefined;
  }
}
