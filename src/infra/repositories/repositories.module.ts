import { Module } from '@nestjs/common';
import { PersonRepository } from './person.repository';
import { Provider } from '@nestjs/common/interfaces/modules/provider.interface';
export const EPersonRepository: Provider[] = [{ provide: 'person-repository', useClass: PersonRepository }];

@Module({
  providers: [...EPersonRepository],
})
export class RepositoriesModule {}
