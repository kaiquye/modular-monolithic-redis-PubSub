import { Module } from '@nestjs/common';
import { Provider } from '@nestjs/common/interfaces/modules/provider.interface';
import { CreateTicketUseCase } from './useCase/create-ticket.use-case';

export const ETicketProvider: Provider[] = [
  { provide: 'create-ticket-use-case', useClass: CreateTicketUseCase },
];

@Module({
  providers: [...ETicketProvider],
})
export class TicketModule {}
