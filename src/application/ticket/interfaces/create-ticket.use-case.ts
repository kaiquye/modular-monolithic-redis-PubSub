import { TicketStatus } from '../../../domain/Ticket/ticket.model';
import { IService } from '../../adapters/service.adapter';
import { Result } from '../../../utils/error/custom-error';

export interface ICreateTicketIN {
  Number: string;
  Location: string;
  Description: string;
  Price: number;
  Person_id: string;
}

export interface ICreateTicketOUT {
  Id: string;
}

export type ICreateTicketUseCase = IService<ICreateTicketIN, Result<ICreateTicketOUT>>;
