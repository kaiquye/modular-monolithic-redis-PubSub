import { Global, Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RepositoriesModule } from './infra/repositories/repositories.module';
import { ControllersModule } from './infra/controller/controllers.module';

@Module({
  providers: [PrismaService, RepositoriesModule, ControllersModule],
  exports: [ControllersModule],
  imports: [ControllersModule],
})
export class AppModule {}
