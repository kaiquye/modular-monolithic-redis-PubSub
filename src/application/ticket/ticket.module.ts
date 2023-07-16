import { Inject, Module, OnModuleInit } from '@nestjs/common';
import { Provider } from '@nestjs/common/interfaces/modules/provider.interface';
import { CreateTicketUseCase } from './useCase/create-ticket.use-case';
import { RepositoriesModule } from '../../infra/repositories/repositories.module';
import { ReserveTicketUseCase } from './useCase/reserve-ticket.use-case';
import { Queue_ } from '../../infra/queue/queue';

export const ETicketProvider: Provider[] = [
  { provide: 'create-ticket-use-case', useClass: CreateTicketUseCase },
  { provide: 'reserve-ticket-use-case', useClass: ReserveTicketUseCase },
];

@Module({
  imports: [RepositoriesModule],
  exports: [...ETicketProvider],
  providers: [...ETicketProvider, Queue_],
})
export class TicketModule implements OnModuleInit {
  constructor(
    private readonly queue: Queue_,
    @Inject('reserve-ticket-use-case')
    private readonly reserveTicketUseCase: ReserveTicketUseCase,
  ) {}

  async onModuleInit() {
    await this.queue.subscribe('reserve-ticket', (value) => this.reserveTicketUseCase.Execute(value));
  }
}
