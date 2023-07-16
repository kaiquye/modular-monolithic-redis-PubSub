import { Body, Controller, Inject, Injectable, Post } from '@nestjs/common';
import { ICreateTicketUseCase } from '../../../application/ticket/interfaces/create-ticket.use-case';
import { CreateTicketBodyDto } from './dtos/create-ticket.dto';

@Controller('/v1/ticket')
export class TicketController {
  constructor(
    @Inject('create-ticket-use-case')
    private readonly createTicketUseCase: ICreateTicketUseCase,
  ) {}

  @Post('/')
  async create(@Body() body: CreateTicketBodyDto) {
    return this.createTicketUseCase.Execute(body);
  }
}
