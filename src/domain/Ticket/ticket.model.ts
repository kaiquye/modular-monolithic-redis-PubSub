import { GenerateNumber } from './services/generate-number';
import { Person } from '../Person/person.model';

export enum TicketStatus {
  RESERVED = 'RESERVED',
  AVAILABLE = 'AVAILABLE',
  UNAVAILABLE = 'UNAVAILABLE',
}

export class Ticket {
  public Id: string;
  public Number: string;
  public Location: string;
  public Description: string;
  public Price: number;
  public Status: TicketStatus;
  public Person_id?: string;

  constructor(
    Number: string,
    Location: string,
    Description: string,
    Price: string,
    Status: TicketStatus,
    Person_id?: string,
    Id?: string,
  ) {
    this.Id = Id;
    this.Number = Number;
    this.Location = Location;
    this.Description = Description;
    this.Price = parseFloat(Price);
    this.Status = Status;
    this.Person_id = Person_id;
  }

  public static Create(Location: string, Description: string, Price: string) {
    const currentStatus = TicketStatus.AVAILABLE;
    const currentNumber = GenerateNumber.generate();

    return new Ticket(currentNumber, Location, Description, Price, currentStatus);
  }

  public Reserved(personId: string): void {
    this.Status = TicketStatus.RESERVED;
    this.Person_id = personId;
  }
}
