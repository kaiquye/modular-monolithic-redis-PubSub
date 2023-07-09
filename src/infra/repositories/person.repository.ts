import { IPersonRepository } from '../../application/person/repositories/person-repository.interface';
import { Person } from '../../domain/Person/person.model';
import { PrismaService } from '../../../prisma/connection';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PersonRepository implements IPersonRepository {
  constructor(private prisma: PrismaService) {}
  async create(data: Person): Promise<Person> {
    return this.prisma.Person.create(data);
  }

  async exists(where: Partial<Person>): Promise<Partial<Person>> {
    return this.prisma.Person.find({ where });
  }
}
