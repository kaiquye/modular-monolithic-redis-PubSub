import { IsNumber, IsString } from 'class-validator';

export class ValidateEmailCodeDto {
  @IsNumber()
  code: number;
  @IsString()
  email: string;
}
