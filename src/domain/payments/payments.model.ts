export enum ETransactionStatus {
  APPROVED = 'APPROVED',
  REFUSED = 'REFUSED',
  PENDING = 'PENDING',
}

export class Transaction {
  public personId: string;
  public amount: string;
  public ticketId: string;
  public status: ETransactionStatus;
  public createdAt?: Date;
  public updatedAt?: Date;
}
