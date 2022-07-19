import { IsString } from 'class-validator';

export class FindAllDto {
  @IsString()
  q: string;
}
