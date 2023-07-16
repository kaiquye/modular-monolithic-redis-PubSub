import { Module } from '@nestjs/common';
import { Provider } from '@nestjs/common/interfaces/modules/provider.interface';
import { FinalizePaymentUseCase } from './useCase/finalize-payment.use-case';
import { TicketModule } from '../ticket/ticket.module';
import { PersonModule } from '../person/person.module';
import { RepositoriesModule } from '../../infra/repositories/repositories.module';
import {Queue_} from "../../infra/queue/queue";

export const EPaymentsProvider: Provider[] = [
  { provide: 'finalize-payment-use-case', useClass: FinalizePaymentUseCase },
];

@Module({
  imports: [TicketModule, PersonModule, RepositoriesModule],
  exports: [...EPaymentsProvider],
  providers: [...EPaymentsProvider, Queue_],
})
export class PaymentsModule {}
