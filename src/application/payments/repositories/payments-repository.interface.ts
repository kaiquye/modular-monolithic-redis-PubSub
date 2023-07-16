import { ETransactionStatus, Transaction } from '../../../domain/payments/payments.model';

export interface IPaymentsRepository {
  save(data: Transaction): Promise<Transaction>;
  updateStatus(transactionId: string, newStatus: ETransactionStatus): Promise<Transaction>;
}
