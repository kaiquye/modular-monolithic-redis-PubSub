import { GenerateNumber } from './services/generate-number';
import { Person } from '../Person/person.model';

export enum TicketStatus {
  RESERVED = 'RESERVED',
  AVAILABLE = 'AVAILABLE',
  UNAVAILABLE = 'UNAVAILABLE',
}

export class Ticket {
  public Id: string;
  public number: string;
  public location: string;
  public description: string;
  public price: number;
  public status: TicketStatus;
  public personId?: string;
  public created_at?: Date;
  public updated_at?: Date;

  constructor(
    Number: string,
    Location: string,
    Description: string,
    Price: number,
    Status: TicketStatus,
    Person_id?: string,
    Id?: string,
  ) {
    this.Id = Id;
    this.number = Number;
    this.location = Location;
    this.description = Description;
    this.price = Price;
    this.status = Status;
    this.personId = Person_id;
  }

  public static Create(Location: string, Description: string, Price: number) {
    const currentStatus = TicketStatus.AVAILABLE;
    const currentNumber = GenerateNumber.generate();

    return new Ticket(currentNumber, Location, Description, Price, currentStatus);
  }

  public Reserved(personId: string): void {
    this.status = TicketStatus.RESERVED;
    this.personId = personId;
  }

  static toDomain(data: Partial<Ticket>): Ticket {
    return Ticket.Create(data.location, data.description, data.price);
  }

  static toView(data: Ticket): Partial<Ticket> {
    return undefined;
  }
}
