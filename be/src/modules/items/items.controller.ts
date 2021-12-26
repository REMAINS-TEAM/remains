import { Controller, Get, Param, Query } from '@nestjs/common';
import { Item } from '@prisma/client';
import { ItemsService } from './items.service';

@Controller('items')
export class ItemsController {
  constructor(private itemsService: ItemsService) {}

  @Get()
  async findAll(@Query('categoryId') categoryId: number): Promise<Item[]> {
    return this.itemsService.findAll({ categoryId: categoryId || undefined });
  }

  @Get(':id')
  async findOne(@Param() params: { id: string }): Promise<Item> {
    return this.itemsService.findOne(+params.id);
  }
}
