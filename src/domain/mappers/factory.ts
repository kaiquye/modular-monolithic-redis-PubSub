import PersonMapper from './person.mapper';

export interface IMapper<T> {
  toDomain(data: Partial<T>): T;
  toView(data: T): Partial<T>;
}

export function FactoryMapper<T>(target): IMapper<T> {
  const mappers = {
    PERSON: PersonMapper,
  };

  return mappers[target];
}
