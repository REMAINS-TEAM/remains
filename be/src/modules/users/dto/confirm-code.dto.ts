import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class ConfirmCodeDto {
  @IsNotEmpty()
  @IsNumber()
  code: number;
  @IsNotEmpty()
  @IsString()
  phone: string;
  @IsOptional()
  @IsBoolean()
  cheat?: boolean; // secret param for login with any code
}
