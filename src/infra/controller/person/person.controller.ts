import { ICreatePersonUseCase } from '../../../application/person/interfaces/create-person.interfaces';
import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CreatePersonDto } from './dtos/create-person.dto';
import { Prisma } from '@prisma/client/extension';
import { Result } from '../../../utils/error/custom-error';

@Controller('/v1/person')
export class PersonController {
  constructor(
    @Inject('create-person-use-case')
    private readonly createPersonUseCase: ICreatePersonUseCase,
  ) {}

  @Post('/')
  create(@Body() body) {
    return Result.Created({
      teste: 'teste',
    });
    return this.createPersonUseCase.Execute(body);
  }
}
