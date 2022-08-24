import {
  IsArray,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Length,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateItemDto {
  @IsString()
  @IsOptional()
  @Length(3, 80, {
    message: 'Длина заголовка должна быть $constraint1-$constraint2 символов',
  })
  title?: string;

  @IsString()
  @IsOptional()
  @Length(10, 200, {
    message: 'Длина описания должна быть $constraint1-$constraint2 символов',
  })
  description?: string;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  price?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  categoryId?: number;

  @IsArray()
  @IsOptional()
  deletedImageNames?: string[];
}
