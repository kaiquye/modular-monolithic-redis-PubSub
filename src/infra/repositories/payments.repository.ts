import { IPaymentsRepository } from '../../application/payments/repositories/payments-repository.interface';
import { Injectable } from '@nestjs/common';
import { ETransactionStatus, Transaction } from '../../domain/payments/payments.model';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class PaymentsRepository implements IPaymentsRepository {
  constructor(private readonly prisma: PrismaService) {}
  async save(data: Transaction): Promise<Transaction> {
    const rs = await this.prisma.transaction.create({
      data: data,
    });
    return rs as unknown as Transaction;
  }

  async updateStatus(transactionId: string, newStatus: ETransactionStatus): Promise<Transaction> {
    const rs = await this.prisma.transaction.update({
      where: {
        Id: transactionId,
      },
      data: {
        status: newStatus,
      },
    });

    return rs as Transaction;
  }
}
