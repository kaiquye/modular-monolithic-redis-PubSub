import { TicketStatus } from '../../../domain/Ticket/ticket.model';
import { IService } from '../../adapters/service.adapter';
import { Result } from '../../../utils/error/custom-error';

export interface ICreateTicketIN {
  number: string;
  location: string;
  description: string;
  price: number;
}

export interface ICreateTicketOUT {
  Id: string;
  code: string;
}

export type ICreateTicketUseCase = IService<ICreateTicketIN, Result<ICreateTicketOUT>>;
