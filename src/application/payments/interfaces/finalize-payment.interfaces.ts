import { IService } from '../../adapters/service.adapter';
import { Transaction } from '../../../domain/payments/payments.model';
import { Result } from '../../../utils/error/custom-error';

export interface IFinalizePaymentIN {
  type: string;
  price: number;
  ticketInfos: {
    number: string;
  };
  payer: {
    name: string;
    count: string;
    document: string;
  };
  receiver: {
    count: string;
  };
}

export interface IFinalizePaymentOUT {
  status: string;
  ticketId: string;
  transaction: Transaction;
}

export type IFinalizePaymentUseCase = IService<IFinalizePaymentIN, Result<IFinalizePaymentOUT>>;
