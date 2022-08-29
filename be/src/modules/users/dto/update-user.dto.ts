import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidateIf,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @MinLength(3)
  @MaxLength(30)
  name?: string;
  @IsOptional()
  @ValidateIf((e) => e.email !== '')
  @IsEmail()
  email?: string;
  @IsOptional()
  @IsNumber()
  companyId?: number;
}
