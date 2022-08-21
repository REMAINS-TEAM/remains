import { IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class FindAllItemsDto {
  @IsOptional()
  @Type(() => Number)
  limit?: number;
  @IsOptional()
  @Type(() => Number)
  offset?: number;
  @IsOptional()
  @Type(() => Number)
  categoryId?: number;
  @IsOptional()
  @Type(() => Number)
  userId?: number;
  @IsOptional()
  @Type(() => Number)
  companyId?: number;
}
