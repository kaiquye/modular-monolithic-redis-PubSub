import {
  IFinalizePaymentIN,
  IFinalizePaymentOUT,
  IFinalizePaymentUseCase,
} from '../interfaces/finalize-payment.interfaces';
import { Inject, Injectable } from '@nestjs/common';
import { Result } from '../../../utils/error/custom-error';
import { ErrPaymentsReference } from './flogs';
import { ReserveTicketEvent } from '../../../domain/Ticket/events/reserve-ticket.event';
import { IPersonRepository } from '../../person/repositories/person-repository.interface';
import { ErrPersonReference } from '../../person/useCases/flags';
import { ErrTicketReference } from '../../ticket/useCase/flags';
import { ITicketRepositoryInterface } from '../../ticket/repositories/ticket-repository.interface';
import { Queue_ } from '../../../infra/queue/queue';
import { IPaymentsRepository } from '../repositories/payments-repository.interface';
import { ETransactionStatus } from '../../../domain/payments/payments.model';

@Injectable()
export class FinalizePaymentUseCase implements IFinalizePaymentUseCase {
  @Inject()
  private readonly queue: Queue_;

  constructor(
    @Inject('person-repository')
    private readonly personRep: IPersonRepository,
    @Inject('ticket-repository')
    private readonly ticketRep: ITicketRepositoryInterface,
    @Inject('payments-repository')
    private readonly paymentsRep: IPaymentsRepository,
  ) {}
  async Execute(input: IFinalizePaymentIN): Promise<Result<IFinalizePaymentOUT>> {
    const { price, type, receiver, payer, ticketInfos } = input;

    const acceptedTypes = ['PIX', 'TED'];
    if (!acceptedTypes.includes(type)) {
      Result.BadRequest({
        message: 'invalid type',
        errorReference: ErrPaymentsReference.CD_INT_400,
      });
    }

    const personFound = await this.personRep.exists({
      document: input.payer.document,
    });
    if (!personFound) {
      Result.NotFound({
        message: 'person: not found',
        errorReference: ErrPersonReference.CD_NFT_400,
      });
    }

    const ticketFound = await this.ticketRep.exists({
      number: input.ticketInfos.number,
    });
    if (!ticketFound) {
      Result.NotFound({
        message: `ticket: not found`,
        errorReference: ErrTicketReference.CD_NFD_404,
      });
    }
    const reserved = !!ticketFound?.personId;
    if (reserved) {
      Result.NotFound({
        message: `ticket: already reserved`,
        errorReference: ErrTicketReference.CD_RSV_409,
      });
    }

    const reserveTicketEvent = new ReserveTicketEvent(
      personFound.firstName,
      personFound.Id,
      ticketFound.Id,
      personFound.email,
    );
    const published = await this.queue.publish('reserve-ticket', reserveTicketEvent);
    if (!published) {
      Result.InternalError({
        message: 'Could`t send the ticket reservation event.',
        errorReference: 'INTERNAL',
      });
    }

    const transaction = await this.paymentsRep.save({
      amount: input.price.toString(),
      personId: personFound.Id,
      ticketId: ticketFound.Id,
      status: ETransactionStatus.PENDING,
    });

    return Result.Ok<IFinalizePaymentOUT>({
      status: transaction.status,
      ticketId: ticketFound.Id,
      transaction: transaction,
    });
  }
}
