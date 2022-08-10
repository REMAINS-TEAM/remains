import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CreateCompanyDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 50, {
    message: 'Длина названия должна быть $constraint1-$constraint2 символов',
  })
  name: string;

  @IsOptional()
  @IsString()
  @Length(0, 200, {
    message: 'Длина описания должна быть $constraint1-$constraint2 символов',
  })
  description?: string;
}
