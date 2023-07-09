import { Module } from '@nestjs/common';
import { TicketController } from './infra/controller/ticket.controller';
import { PrismaService } from '../prisma/connection';
import { RepositoriesModule } from './infra/repositories/repositories.module';

@Module({
  imports: [],
  controllers: [TicketController],
  providers: [PrismaService, RepositoriesModule],
})
export class AppModule {}
