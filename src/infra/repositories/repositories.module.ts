import { Module } from '@nestjs/common';
import { PersonRepository } from './person.repository';
import { Provider } from '@nestjs/common/interfaces/modules/provider.interface';
import { PrismaService } from '../../../prisma/prisma.service';
export const EPersonRepository: Provider[] = [{ provide: 'person-repository', useClass: PersonRepository }];

@Module({
  providers: [...EPersonRepository, PrismaService],
  exports: [...EPersonRepository],
})
export class RepositoriesModule {}
