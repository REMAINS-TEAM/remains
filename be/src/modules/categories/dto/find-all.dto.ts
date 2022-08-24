import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class FindAllDto {
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  parentId: number;

  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  onlyNotEmpty: boolean;
}
