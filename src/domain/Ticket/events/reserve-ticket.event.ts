export class ReserveTicketEvent {
  public Date: Date;
  public Name: string;
  public metadata: {
    personId: string;
    ticketId: string;
    email: string;
  };

  constructor(name, personId, ticketId, email) {
    this.Date = new Date();
    this.Name = name;
    this.metadata = {
      personId,
      ticketId,
      email,
    };
  }
}
