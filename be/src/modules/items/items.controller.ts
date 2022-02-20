import {
  BadRequestException,
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Headers,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { Item } from '@prisma/client';
import { ItemsService } from './items.service';
import { Access } from 'decorators/access.decorator';
import { MAX_ITEMS_FOR_NOT_REGISTERED_USER } from 'constants/main';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('items')
export class ItemsController {
  constructor(private itemsService: ItemsService) {}

  @Get()
  async findAll(
    @Access() access: boolean,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset: number,
    @Query('categoryId') categoryId?: number,
  ): Promise<Item[]> {
    let availableLimit = limit;
    if (!access) {
      if (offset > MAX_ITEMS_FOR_NOT_REGISTERED_USER) {
        throw new BadRequestException('Access is not paid for');
      }
      if (limit > MAX_ITEMS_FOR_NOT_REGISTERED_USER) {
        availableLimit = MAX_ITEMS_FOR_NOT_REGISTERED_USER;
      }
    }
    return this.itemsService.findAll({
      categoryId: categoryId || undefined,
      limit: availableLimit,
      offset,
    });
  }

  @Get(':id')
  async findOne(@Param() params: { id: string }): Promise<Item> {
    return this.itemsService.findOne(+params.id);
  }

  @Post()
  @UseInterceptors(FilesInterceptor('images', 10))
  async create(
    @UploadedFiles() images: Express.Multer.File[],
    @Body()
    createItemDto: {
      title: string;
      description: string;
      price: string;
      categoryId: string;
    },
    @Headers() headers: { authorization: string | undefined },
  ): Promise<Item> {
    const authHeader = headers.authorization || '';
    const token = authHeader.split(' ')[1];

    return this.itemsService.create(token, createItemDto, images);
  }

  @Delete(':id')
  async delete(
    @Param() params: { id: string },
    @Headers() headers: { authorization: string | undefined },
  ): Promise<Item> {
    const authHeader = headers.authorization || '';
    const token = authHeader.split(' ')[1];

    return this.itemsService.delete(token, +params.id);
  }
}
