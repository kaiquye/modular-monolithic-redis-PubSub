import {PrismaService} from 'prisma/prisma.service';
import {IPersonRepository} from '../../application/person/repositories/person-repository.interface';
import {EPersonStatus, Person} from '../../domain/Person/person.model';
import {Injectable} from '@nestjs/common';

@Injectable()
export class PersonRepository implements IPersonRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: Person): Promise<Person> {
    const rs = await this.prisma.person.create({
      data: data
    })

    return new Person(rs.firstName, rs.lastName, rs.email, rs.document, rs.password, EPersonStatus[rs.status], rs.Id)
  }

  async exists(where: Partial<Person>): Promise<Partial<Person>> {
    const rs = await this.prisma.person.findFirst({ where });
    if(rs.Id) {
      return new Person(rs?.firstName, rs?.lastName, rs?.email, rs?.document, rs?.password, EPersonStatus[rs?.status], rs?.Id)
    }
    return null;
  }
}
