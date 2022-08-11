import { IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class FindAllDto {
  @IsOptional()
  @Type(() => Number)
  parentId: number;
  @IsOptional()
  @Type(() => Boolean)
  onlyNotEmpty: boolean;
}
