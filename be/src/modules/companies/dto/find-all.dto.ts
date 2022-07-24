import { IsOptional, IsString } from 'class-validator';

export class FindAllDto {
  @IsString()
  @IsOptional()
  name?: string;
}
