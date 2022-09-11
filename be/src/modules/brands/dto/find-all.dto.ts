import { IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class FindAllDto {
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  categoryId?: number;
}
