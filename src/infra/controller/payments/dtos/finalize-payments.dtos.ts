import { IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class payer {
  @IsString()
  name: string;
  @IsString()
  count: string;
  @IsString()
  document: string;
}

export class receiver {
  @IsString()
  count: string;
}
export class FinalizePaymentsDtos {
  @IsString()
  type: string;
  @IsNumber()
  price: number;
  @IsString()
  ticketNumber: string;
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => payer)
  payer: payer;
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => receiver)
  receiver: receiver;
}
