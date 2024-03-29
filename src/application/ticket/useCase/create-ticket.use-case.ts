import { ICreateTicketIN, ICreateTicketOUT, ICreateTicketUseCase } from '../interfaces/create-ticket.use-case';
import { Result } from '../../../utils/error/custom-error';
import { ErrTicketReference } from './flags';
import { ITicketRepositoryInterface } from '../repositories/ticket-repository.interface';
import { Inject, Injectable } from '@nestjs/common';
import { Ticket } from '../../../domain/Ticket/ticket.model';

@Injectable()
export class CreateTicketUseCase implements ICreateTicketUseCase {
  constructor(
    @Inject('ticket-repository')
    private readonly ticketRep: ITicketRepositoryInterface,
  ) {}
  async Execute(input: ICreateTicketIN): Promise<Result<ICreateTicketOUT>> {
    const ticket = Ticket.toDomain(input);

    const ticketAlreadyExists = await this.ticketRep.exists({
      number: ticket.number,
    });

    if (ticketAlreadyExists) {
      Result.Conflict({
        message: 'ticket already exists',
        errorReference: ErrTicketReference.CD_ALR_409,
      });
    }

    const newTicket = await this.ticketRep.save(ticket);

    return Result.Created<ICreateTicketOUT>({ Id: newTicket.Id, code: newTicket.number });
  }
}
