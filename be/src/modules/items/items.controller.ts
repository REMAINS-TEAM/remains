import {
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { Item } from '@prisma/client';
import { ItemsService } from './items.service';

@Controller('items')
export class ItemsController {
  constructor(private itemsService: ItemsService) {}

  @Get()
  async findAll(
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset: number,
    @Query('categoryId') categoryId?: number,
  ): Promise<Item[]> {
    return this.itemsService.findAll({
      categoryId: categoryId || undefined,
      limit,
      offset,
    });
  }

  @Get(':id')
  async findOne(@Param() params: { id: string }): Promise<Item> {
    return this.itemsService.findOne(+params.id);
  }
}
