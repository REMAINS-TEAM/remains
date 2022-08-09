import {
  IsString,
  Length,
  IsPositive,
  IsOptional,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCompanyDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 20, {
    message: 'Длина названия должна быть $constraint1-$constraint2 символов',
  })
  name: string;

  @IsOptional()
  @IsString()
  @Length(0, 200, {
    message: 'Длина описания должна быть $constraint1-$constraint2 символов',
  })
  description: string;
}
