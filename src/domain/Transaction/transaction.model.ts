export enum ETransactionStatus {
  APPROVED = 'APPROVED',
  REFUSED = 'REFUSED',
  PENDING = 'PENDING',
}

export class Transaction {
  private PersonId: string;
  private amount: string;
  private ticketId: string;
  private status: ETransactionStatus;
  private createdAt: Date;
  private updatedAt: Date;
}
