import { Body, Controller, Inject, Post } from '@nestjs/common';
import { IFinalizePaymentUseCase } from '../../../application/payments/interfaces/finalize-payment.interfaces';
import { FinalizePaymentsDtos } from './dtos/finalize-payments.dtos';

@Controller('/v1/payments')
export class PaymentsController {
  constructor(
    @Inject('finalize-payment-use-case')
    private readonly finalizePayments: IFinalizePaymentUseCase,
  ) {}

  @Post('/')
  create(@Body() body: FinalizePaymentsDtos) {
    return this.finalizePayments.Execute({ ticketInfos: { number: body.ticketNumber }, ...body });
  }
}
