import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ConfirmCodeDto {
  @IsNotEmpty()
  @IsNumber()
  code: number;
  @IsNotEmpty()
  @IsString()
  phone: string;
}
