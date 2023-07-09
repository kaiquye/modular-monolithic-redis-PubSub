import { IPersonRepository } from '../repositories/person-repository.interface';
import { Inject, Injectable } from '@nestjs/common';
import {
  ICreatePersonIN,
  ICreatePersonOUT,
  ICreatePersonUseCase,
} from '../interfaces/create-person.interfaces';
import { Result } from '../../../utils/error/custom-error';
import { FactoryMapper } from '../../../domain/mappers/factory';
import { Person } from '../../../domain/Person/person.model';
import { Cache } from '../../../infra/redis/connection';

@Injectable()
export class CreatePersonUseCase implements ICreatePersonUseCase {
  constructor(
    @Inject('person-repository')
    private personRep: IPersonRepository,
  ) {}

  async Execute(input: ICreatePersonIN): Promise<Result<ICreatePersonOUT>> {
    const person = FactoryMapper<Person>('PERSON').toDomain(input);

    const alreadyRegistered = await this.personRep.exists({
      document: person.document,
    });

    if (alreadyRegistered) {
      Result.Conflict({
        message: 'person already registered',
        code: '',
      });
    }

    const cache = new Cache();
    const keyEmail = person.email;
    const emailCode = await cache.get(keyEmail);
    if (!emailCode?.['confirmed']) {
      console.log('email n aprovado.');
    }

    const newPerson = await this.personRep.create(person);

    return Result.Created<ICreatePersonOUT>(newPerson);
  }
}
