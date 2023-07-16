import { ITicketRepositoryInterface } from '../../application/ticket/repositories/ticket-repository.interface';
import { Ticket, TicketStatus } from '../../domain/Ticket/ticket.model';
import { PrismaService } from '../../../prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TicketRepository implements ITicketRepositoryInterface {
  constructor(private readonly prisma: PrismaService) {}

  async save(data: Ticket): Promise<Ticket> {
    const rs = await this.prisma.ticket.create({
      data: {
        price: data.price,
        number: data.number,
        status: data.status,
        description: data.description,
        location: data.location,
      },
    });

    return rs as unknown as Ticket;
  }
  async exists(where: Partial<Ticket>): Promise<Partial<Ticket>> {
    const rs = await this.prisma.ticket.findUnique({ where });
    return rs as Partial<Ticket>;
  }

  async reserve(ticketId: string, personId: string): Promise<Ticket> {
    const rs = await this.prisma.ticket.update({
      where: { Id: ticketId },
      data: {
        personId,
        status: TicketStatus.RESERVED,
      },
    });
    return rs as Ticket;
  }

  async updateStatus(ticketId: string, newStatus: TicketStatus): Promise<Ticket> {
    const rs = await this.prisma.ticket.update({
      where: {
        Id: ticketId,
      },
      data: {
        status: newStatus,
      },
    });

    return rs as Ticket;
  }
}
