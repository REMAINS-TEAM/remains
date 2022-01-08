import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class RegisterUserDto {
  @IsString()
  name: string;
  @IsString()
  phone: string;
  @IsEmail()
  email: string;
  @IsNumber()
  companyId: number;
  @IsNotEmpty()
  password: string;
}
