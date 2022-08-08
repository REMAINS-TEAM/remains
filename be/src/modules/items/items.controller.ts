import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Item } from '@prisma/client';
import { ItemsService } from './items.service';
import { IsPaid } from 'decorators/isPaid.decorator';
import {
  MAX_FILE_SIZE,
  MAX_ITEMS_FOR_NOT_REGISTERED_USER,
} from 'constants/main';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreateItemDto } from 'modules/items/dto/create-item.dto';
import { FindAllItemsDto } from 'modules/items/dto/find-all-items.dto';
import { OnlyForPaidGuard } from 'guards/onlyForPaid.guard';
import { CurrentUserId } from 'decorators/current-user.decorator';

@Controller('items')
export class ItemsController {
  constructor(private itemsService: ItemsService) {}

  @Get()
  async findAll(
    @IsPaid() isPaid: boolean,
    @Query() { limit = 10, offset = 0, categoryId, userId }: FindAllItemsDto,
  ): Promise<Item[]> {
    let availableLimit = limit;
    if (!isPaid) {
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
  @UseGuards(OnlyForPaidGuard)
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      limits: { fileSize: MAX_FILE_SIZE },
    }),
  )
  async create(
    @UploadedFiles() images: Express.Multer.File[],
    @Body() createItemDto: CreateItemDto,
    @Headers() headers: { authorization: string | undefined },
    @CurrentUserId() userId: number,
  ): Promise<Item> {
    return this.itemsService.create(userId, createItemDto, images);
  }

  @Delete(':id')
  @UseGuards(OnlyForPaidGuard)
  async delete(
    @Param() params: { id: string },
    @Headers() headers: { authorization: string | undefined },
  ): Promise<Item> {
    const authHeader = headers.authorization || '';
    const token = authHeader.split(' ')[1];

    return this.itemsService.delete(token, +params.id);
  }
}
