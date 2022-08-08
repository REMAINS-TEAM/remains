import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class GetItemImage {
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  itemId: number;
  @IsNotEmpty()
  @IsString()
  filename: string;
}
