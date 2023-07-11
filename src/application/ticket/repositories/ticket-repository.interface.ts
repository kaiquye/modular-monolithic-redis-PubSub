import { Ticket } from '../../../domain/Ticket/ticket.model';

export interface ITicketRepositoryInterface {
  save(data: Ticket): Promise<Ticket>;
  exists(data: Partial<Ticket>): Promise<Partial<Ticket>>;
}
