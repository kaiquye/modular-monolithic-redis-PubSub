import { Module } from '@nestjs/common';
import { Provider } from '@nestjs/common/interfaces/modules/provider.interface';
import { CreatePersonUseCase } from './useCases/create-person.use-case';
import { RepositoriesModule } from '../../infra/repositories/repositories.module';
export const EPersonServices: Provider[] = [
  { provide: 'create-person-use-case', useClass: CreatePersonUseCase },
];
@Module({
  imports: [RepositoriesModule],
  exports: [...EPersonServices],
  providers: [...EPersonServices],
})
export class PersonModule {}
