export class ConfirmPaymentEvent {
  public name: string;
  public Date: Date;
  public metadata: {
    status: string;
    email: string;
    ticketId: string;
    transactionId: string;
  };

  constructor(ticketId: string, transactionId: string, status: string, email: string) {
    this.name = 'RESULT.OF.PAYMENT.PROCESSING';
    this.Date = new Date();
    this.metadata = {
      email,
      status,
      ticketId,
      transactionId,
    };
  }
}
