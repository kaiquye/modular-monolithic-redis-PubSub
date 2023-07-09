import { Test } from '@nestjs/testing';
import { CreatePersonUseCase } from '../create-person.use-case';
import { ICreatePersonUseCase } from '../../interfaces/create-person.interfaces';

describe('CatsController', () => {
  let createPerson: ICreatePersonUseCase;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [CreatePersonUseCase],
    }).compile();

    createPerson = moduleRef.get<ICreatePersonUseCase>(CreatePersonUseCase);
  });

  describe('create person', () => {
    it('should return an object person', async () => {
      const Person = {
        firstName: 'Kaique',
        lastName: 'Silva',
        email: 'kaique@gmail.com',
        document: '0000000000',
        password: '000000@0_',
      };

      const result = await createPerson.Execute(Person);

      expect(result?.['password']).toBeUndefined();
      expect(result?.['Created_At']).toBeUndefined();
      expect(result?.['Updated_At']).toBeUndefined();
    });
  });
});
