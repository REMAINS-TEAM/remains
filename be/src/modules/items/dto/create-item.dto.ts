import { IsString, Length, IsPositive, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateItemDto {
  @IsString()
  @Length(3, 80, {
    message: 'Длина заголовка должна быть $constraint1-$constraint2 символов',
  })
  title: string;

  @IsString()
  @Length(10, 200, {
    message: 'Длина описания должна быть $constraint1-$constraint2 символов',
  })
  description: string;

  @IsNumber()
  @Type(() => Number)
  @IsPositive()
  price: number;

  @IsNumber()
  @Type(() => Number)
  categoryId: number;
}
