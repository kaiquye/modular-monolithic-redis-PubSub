import { IMapper } from './factory';
import { Person } from '../Person/person.model';

class PersonMapper implements IMapper<Person> {
  toDomain(data: Partial<Person>): Person {
    return Person.Create(data.firstName, data.lastName, data.email, data.document, data.password);
  }

  toView(data: Person): Partial<Person> {
    return undefined;
  }
}

export default new PersonMapper();
