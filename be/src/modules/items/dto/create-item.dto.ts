import { IsString, Length, IsPositive } from 'class-validator';
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

  @Type(() => Number)
  @IsPositive()
  price: number;
  @Type(() => Number)
  categoryId: number;
}
