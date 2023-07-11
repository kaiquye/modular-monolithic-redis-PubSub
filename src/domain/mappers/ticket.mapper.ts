import { IMapper } from './factory';
import { Ticket } from '../Ticket/ticket.model';

class TicketMapper implements IMapper<Ticket> {
  toDomain(data: Partial<Ticket>): Ticket {
    return Ticket.Create(data.Location, data.Description, data.Price);
  }

  toView(data: Ticket): Partial<Ticket> {
    return undefined;
  }
}

export default new TicketMapper();
