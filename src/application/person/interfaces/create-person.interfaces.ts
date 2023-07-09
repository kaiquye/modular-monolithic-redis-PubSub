import { IService } from '../../adapters/service.adapter';
import { Person } from '../../../domain/Person/person.model';
import { Result } from '../../../utils/error/custom-error';

export interface ICreatePersonIN {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  document: string;
}

export type ICreatePersonOUT = Person;

export type ICreatePersonUseCase = IService<ICreatePersonIN, Result<ICreatePersonOUT>>;
