import { IsEmail, IsNumber, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  name?: string;
  @IsEmail()
  email?: string;
  @IsNumber()
  companyId?: number;
  @IsString()
  companyName?: string;
  @IsString()
  companyDescription?: string;
}
