import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  name?: string;
  @IsOptional()
  @IsEmail()
  email?: string;
  @IsOptional()
  @IsNumber()
  companyId?: number;
}
