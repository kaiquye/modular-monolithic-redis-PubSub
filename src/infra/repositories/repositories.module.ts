import { Module } from '@nestjs/common';
import { PersonRepository } from './person.repository';
import { Provider } from '@nestjs/common/interfaces/modules/provider.interface';
import { PrismaService } from '../../../prisma/prisma.service';
import { TicketRepository } from './ticket.repository';
import { PaymentsRepository } from './payments.repository';

export const ERepository: Provider[] = [
  { provide: 'person-repository', useClass: PersonRepository },
  { provide: 'ticket-repository', useClass: TicketRepository },
  { provide: 'payments-repository', useClass: PaymentsRepository },
];

@Module({
  providers: [...ERepository, PrismaService],
  exports: [...ERepository],
})
export class RepositoriesModule {}
