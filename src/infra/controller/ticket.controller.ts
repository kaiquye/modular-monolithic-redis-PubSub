import { Controller, Param, Post } from '@nestjs/common';

@Controller('/ticket')
export class TicketController {
  @Post('/reservation/:ticketNumber')
  reservation(@Param('ticketNumber') param) {
    console.log(param);
  }
}
