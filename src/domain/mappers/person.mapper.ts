import { IMapper } from './factory';
import { Person } from '../Person/person.model';

class PersonMapper implements IMapper<Person> {
  toDomain(data: Partial<Person>): Person {
    return undefined;
  }

  toView(data: Person): Partial<Person> {
    return undefined;
  }
}

export default new PersonMapper();
