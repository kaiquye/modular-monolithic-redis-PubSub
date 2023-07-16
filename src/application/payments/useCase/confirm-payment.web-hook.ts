import { IConfirmPaymentWebHook } from '../interfaces/confirm-payment.web-hook.interfaces';
import { Inject, Injectable } from '@nestjs/common';
import { IPaymentsRepository } from '../repositories/payments-repository.interface';
import { ITicketRepositoryInterface } from '../../ticket/repositories/ticket-repository.interface';
import { ConfirmPaymentEvent } from '../../../domain/payments/events/confirm-payment.event';
import { ETransactionStatus } from '../../../domain/payments/payments.model';
import { TicketStatus } from '../../../domain/Ticket/ticket.model';
import { NotifyReserveTicketProvider } from '../../../utils/providers/email/notify-reserve-ticket.provider';

@Injectable()
export class ConfirmPaymentWebHook implements IConfirmPaymentWebHook {
  @Inject('payment-repository')
  private paymentRep: IPaymentsRepository;
  @Inject('ticket-repository')
  private ticketRep: ITicketRepositoryInterface;

  async Execute(event: ConfirmPaymentEvent): Promise<void> {
    const ticketFound = await this.ticketRep.exists({
      Id: event.metadata.ticketId,
    });
    if (!ticketFound) {
      console.error('ticket not found', event);
    }

    const actions = {
      APPROVED: async () => {
        console.log('confined payment', event);
        await NotifyReserveTicketProvider({
          status: 'approved',
          ticketId: event.metadata.ticketId,
          to: event.metadata.email,
        });
        await this.paymentRep.updateStatus(event.metadata.ticketId, ETransactionStatus.APPROVED);
      },
      REFUSED: async () => {
        console.log('refused payment', event);
        await this.ticketRep.updateStatus(event.metadata.ticketId, TicketStatus.AVAILABLE);
        await this.paymentRep.updateStatus(event.metadata.ticketId, ETransactionStatus.REFUSED);
      },
    };

    await actions[event.metadata.status];
    return null;
  }
}
