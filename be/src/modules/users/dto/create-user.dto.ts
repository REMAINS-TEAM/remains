import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateUserDto {
  @IsString()
  name: string;
  @IsString()
  phone: string;
  @IsEmail()
  email: string;
  @IsNumber()
  companyId: number;
  // @IsNotEmpty()
  // password: string;
}
