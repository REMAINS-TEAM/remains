import { IsString, Length } from 'class-validator';

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
  @IsString()
  @Length(1, 8, {
    message: 'Длина цены должна быть $constraint1-$constraint2 символов',
  })
  price: string;
  @IsString()
  categoryId: string;
}
