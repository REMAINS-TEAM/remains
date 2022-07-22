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
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { Item } from '@prisma/client';
import { ItemsService } from './items.service';
import { Access } from 'decorators/access.decorator';
import {
  MAX_FILE_SIZE,
  MAX_ITEMS_FOR_NOT_REGISTERED_USER,
} from 'constants/main';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreateItemDto } from 'modules/items/dto/create-item.dto';
import { FindAllItemsDto } from 'modules/items/dto/find-all-items.dto';

@Controller('items')
export class ItemsController {
  constructor(private itemsService: ItemsService) {}

  @Get()
  async findAll(
    @Access() access: boolean,
    @Query() { limit = 10, offset = 0, categoryId, userId }: FindAllItemsDto,
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
      limit: availableLimit,
      offset,
      filter: { categoryId, userId },
    });
  }

  @Get(':id')
  async findOne(@Param() params: { id: string }) {
    return this.itemsService.findOne(+params.id);
  }

  @Post()
  @UseInterceptors(
    FilesInterceptor('images', 10, { limits: { fileSize: MAX_FILE_SIZE } }),
  )
  async create(
    @UploadedFiles() images: Express.Multer.File[],
    @Body()
    createItemDto: CreateItemDto,
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
