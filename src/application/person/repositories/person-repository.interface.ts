import { Person } from '../../../domain/Person/person.model';

export interface IPersonRepository {
  create(data: Person): Promise<Person>;
  exists(data: Partial<Person>): Promise<Partial<Person>>;
}
