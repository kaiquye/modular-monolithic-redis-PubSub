import { Ticket, TicketStatus } from '../../../domain/Ticket/ticket.model';

export interface ITicketRepositoryInterface {
  save(data: Ticket): Promise<Ticket>;
  exists(data: Partial<Ticket>): Promise<Partial<Ticket>>;
  reserve(ticketId: string, personId: string): Promise<Partial<Ticket>>;
  updateStatus(ticketId: string, newStatus: TicketStatus): Promise<Partial<Ticket>>;
}
