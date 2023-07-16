import { Module } from '@nestjs/common';
import { Provider } from '@nestjs/common/interfaces/modules/provider.interface';
import { CreatePersonUseCase } from './useCases/create-person.use-case';
import { RepositoriesModule } from '../../infra/repositories/repositories.module';
import { SendCodeEmailUseCase } from './useCases/send-code-email.use-case';
import { ValidateEmailUseCase } from './useCases/validate-email.use-case';
export const EPersonServices: Provider[] = [
  { provide: 'create-person-use-case', useClass: CreatePersonUseCase },
  { provide: 'send-code-use-case', useClass: SendCodeEmailUseCase },
  { provide: 'validate-code-use-case', useClass: ValidateEmailUseCase },
];
@Module({
  imports: [RepositoriesModule],
  exports: [...EPersonServices],
  providers: [...EPersonServices],
})
export class PersonModule {}
