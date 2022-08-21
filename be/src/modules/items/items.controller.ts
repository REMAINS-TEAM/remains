import {
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
import { MAX_FILE_SIZE } from 'constants/main';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreateItemDto } from 'modules/items/dto/create-item.dto';
import { FindAllItemsDto } from 'modules/items/dto/find-all-items.dto';
import { OnlyForPaidGuard } from 'guards/onlyForPaid.guard';
import { CurrentUserId } from 'decorators/current-user.decorator';
import { GetIsPaidGuard } from 'guards/getIsPaid.guard';
import { Pagination } from 'decorators/pagination.decorator';
import { IsPaid } from 'decorators/isPaid.decorator';

@Controller('items')
export class ItemsController {
  constructor(private itemsService: ItemsService) {}

  @Get()
  @UseGuards(GetIsPaidGuard)
  async findAll(
    @Query() { categoryId, userId, companyId }: FindAllItemsDto,
    @IsPaid() isPaid: boolean,
    @Pagination() { limit, offset }: { limit: number; offset: number },
  ): Promise<Item[]> {
    return this.itemsService.findAll({
      limit,
      offset,
      filter: { categoryId, userId, companyId },
      isPaid,
    });
  }

  @Get(':id')
  @UseGuards(GetIsPaidGuard)
  async findOne(@Param() params: { id: string }, @IsPaid() isPaid: boolean) {
    return this.itemsService.findOne(+params.id, isPaid);
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
    @CurrentUserId() userId: number,
  ): Promise<Item> {
    return this.itemsService.create(userId, createItemDto, images);
  }

  @Delete(':id')
  @UseGuards(OnlyForPaidGuard)
  async delete(
    @Param() params: { id: string },
    @Headers() headers: { authorization: string | undefined },
    @CurrentUserId() userId: number,
  ): Promise<Item | null> {
    return this.itemsService.delete(userId, +params.id);
  }
}
