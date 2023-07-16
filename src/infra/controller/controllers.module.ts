import { Module } from '@nestjs/common';
import { PersonController } from './person/person.controller';
import { PersonModule } from '../../application/person/person.module';
import { TicketModule } from '../../application/ticket/ticket.module';
import { TicketController } from './ticket/ticket.controller';
import { PaymentsModule } from '../../application/payments/payments.module';
import { PaymentsController } from './payments/person.controller';

@Module({
  controllers: [PersonController, TicketController, PaymentsController],
  imports: [PersonModule, TicketModule, PaymentsModule],
})
export class ControllersModule {}
