import { EPersonStatus, Person } from '../../../../domain/Person/person.model';
import { IsEmail, IsIn, IsOptional, IsString, Length } from 'class-validator';

export class CreatePersonDto {
  @IsString()
  @Length(11, 15)
  document: string;
  @IsEmail()
  email: string;
  @IsString()
  firstName: string;
  @IsString()
  @IsOptional()
  lastName: string;
  @IsString()
  password: string;
}
