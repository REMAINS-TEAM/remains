import { IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto {
  @IsString()
  login: string;
  @IsNotEmpty()
  password: string;
}
