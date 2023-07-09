import { Module } from '@nestjs/common';
import { PersonController } from './person/person.controller';
import { PersonModule } from '../../application/person/person.module';

@Module({
  controllers: [PersonController],
  imports: [PersonModule],
})
export class ControllersModule {}
