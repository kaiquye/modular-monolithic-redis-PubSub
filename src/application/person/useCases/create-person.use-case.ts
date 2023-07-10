import { IPersonRepository } from '../repositories/person-repository.interface';
import { Inject, Injectable, Res } from '@nestjs/common';
import {
  ICreatePersonIN,
  ICreatePersonOUT,
  ICreatePersonUseCase,
} from '../interfaces/create-person.interfaces';
import { Result } from '../../../utils/error/custom-error';
import { FactoryMapper } from '../../../domain/mappers/factory';
import { Person } from '../../../domain/Person/person.model';
import { Cache } from '../../../infra/redis/connection';
import { ErrPersonReference } from './flags';

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
      email: person.email,
    });

    if (alreadyRegistered) {
      Result.Conflict({
        message: 'person already registered',
        errorReference: ErrPersonReference.CD_ALR_409,
      });
    }

    const cache = new Cache();
    await cache.connection();

    const value = await cache.get(input.email);
    const valueParse = JSON.parse(value);

    if (!valueParse?.['confirmed']) {
      Result.BadRequest({
        message: 'unconfirmed email code',
        errorReference: ErrPersonReference.CD_CIV_400,
      });
    }

    const newPerson = await this.personRep.create(person);

    return Result.Created<ICreatePersonOUT>(newPerson);
  }
}
