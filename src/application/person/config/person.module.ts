import { Module } from '@nestjs/common';
import { Provider } from '@nestjs/common/interfaces/modules/provider.interface';
export const EPersonServices: Provider[] = [{ provide: 'create-person-use-case', useClass: {} as any }];
@Module({
  providers: [...EPersonServices],
})
export class PersonModule {}
