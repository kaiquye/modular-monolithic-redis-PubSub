import { ICreatePersonUseCase } from '../../../application/person/interfaces/create-person.interfaces';
import { Body, Controller, Inject, Param, Post } from '@nestjs/common';
import { Result } from '../../../utils/error/custom-error';
import { CreatePersonDto } from './dtos/create-person.dto';
import { SendEmailCodeDto } from './dtos/send-email-code.dto';
import { ISendEmailCodeUseCase } from '../../../application/person/interfaces/send-code-email.interfaces';
import { IValidateEmailCodeUseCase } from '../../../application/person/interfaces/validate-email.interfaces';
import { ValidateEmailCodeDto } from './dtos/validate-email-code.dto';

@Controller('/v1/person')
export class PersonController {
  constructor(
    @Inject('create-person-use-case')
    private readonly createPersonUseCase: ICreatePersonUseCase,
    @Inject('send-code-use-case')
    private readonly sendEmailCodeUseCase: ISendEmailCodeUseCase,
    @Inject('validate-code-use-case')
    private readonly validateEmailCodeUseCase: IValidateEmailCodeUseCase,
  ) {}

  @Post('/')
  create(@Body() body: CreatePersonDto) {
    return this.createPersonUseCase.Execute(body);
  }
  @Post('/code/send')
  sendEmailCode(@Body() body: SendEmailCodeDto) {
    return this.sendEmailCodeUseCase.Execute(body);
  }
  @Post('/code/confirm')
  confirmEmailCode(@Body() body: ValidateEmailCodeDto) {
    return this.validateEmailCodeUseCase.Execute(body);
  }
}
