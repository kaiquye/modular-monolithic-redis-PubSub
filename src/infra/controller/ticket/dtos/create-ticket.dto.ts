import { IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateTicketBodyDto {
  @IsString()
  number: string;
  @IsString()
  location: string;
  @IsString()
  description: string;
  @IsNumber()
  price: number;
  @IsUUID()
  person_id: string;
}
