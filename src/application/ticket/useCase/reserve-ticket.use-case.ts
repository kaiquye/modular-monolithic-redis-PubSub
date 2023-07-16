import { IReserveTicketUseCase } from '../interfaces/Reserve-ticket.interfaces';
import { Inject, Injectable } from '@nestjs/common';
import { ReserveTicketEvent } from '../../../domain/Ticket/events/reserve-ticket.event';
import { ITicketRepositoryInterface } from '../repositories/ticket-repository.interface';
import { TicketStatus } from '../../../domain/Ticket/ticket.model';
import { NotifyReserveTicketProvider } from '../../../utils/providers/email/notify-reserve-ticket.provider';

@Injectable()
export class ReserveTicketUseCase implements IReserveTicketUseCase {
  constructor(
    @Inject('ticket-repository')
    private readonly ticketRep: ITicketRepositoryInterface,
  ) {}
  async Execute(input: ReserveTicketEvent): Promise<void> {
    console.log(input);
    const ticketFound = await this.ticketRep.exists({
      Id: input.metadata.ticketId,
    });

    console.log(ticketFound);

    if (ticketFound && ticketFound.status === TicketStatus.AVAILABLE) {
      await this.ticketRep.reserve(input.metadata.ticketId, input.metadata.personId);
      await NotifyReserveTicketProvider({
        to: input.metadata.email,
        ticketId: input.metadata.ticketId,
        status: TicketStatus.RESERVED,
      });
    }

    await NotifyReserveTicketProvider({
      to: input.metadata.email,
      ticketId: input.metadata.ticketId,
      status: TicketStatus.UNAVAILABLE,
    });
  }
}
