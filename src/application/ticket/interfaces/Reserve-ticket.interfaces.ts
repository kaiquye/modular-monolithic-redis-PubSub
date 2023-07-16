import { IService } from '../../adapters/service.adapter';
import { ReserveTicketEvent } from '../../../domain/Ticket/events/reserve-ticket.event';

export interface IReserveTicketIN {
  personId: string;
  ticketNumber: string;
}

export type IReserveTicketUseCase = IService<ReserveTicketEvent, void>;
