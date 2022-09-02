import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Item } from '@prisma/client';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { FindAllItemsDto } from './dto/find-all-items.dto';
import { OnlyForPaidGuard } from 'guards/onlyForPaid.guard';
import { CurrentUserId } from 'decorators/current-user.decorator';
import { GetIsPaidOrAdminGuard } from 'guards/getIsPaidOrAdmin.guard';
import { Pagination } from 'decorators/pagination.decorator';
import { IsPaid } from 'decorators/isPaid.decorator';
import { UpdateItemDto } from './dto/update-item.dto';
import { GetImages } from './items.interceptors';
import { IsAdmin } from 'decorators/isAdmin.decorator';

@Controller('items')
export class ItemsController {
  constructor(private itemsService: ItemsService) {}

  @Get()
  @UseGuards(GetIsPaidOrAdminGuard)
  async findAll(
    @Query() { categoryId, userId, companyId }: FindAllItemsDto,
    @IsPaid() isPaid: boolean,
    @Pagination() { limit, offset }: { limit: number; offset: number },
  ) {
    return this.itemsService.findAll({
      limit,
      offset,
      filter: { categoryId, userId, companyId },
      isPaid,
    });
  }

  @Get(':id')
  @UseGuards(GetIsPaidOrAdminGuard)
  async findOne(@Param() params: { id: string }, @IsPaid() isPaid: boolean) {
    return this.itemsService.findOne(+params.id, isPaid);
  }

  @Post()
  @UseGuards(OnlyForPaidGuard)
  @UseInterceptors(GetImages)
  async create(
    @UploadedFiles() images: Express.Multer.File[],
    @Body() createItemDto: CreateItemDto,
    @CurrentUserId() userId: number,
  ): Promise<Item> {
    return this.itemsService.create(userId, createItemDto, images);
  }

  @Patch(':id')
  @UseGuards(OnlyForPaidGuard, GetIsPaidOrAdminGuard)
  @UseInterceptors(GetImages)
  async update(
    @Param() params: { id: string },
    @UploadedFiles() images: Express.Multer.File[],
    @Body() updateItemDto: UpdateItemDto,
    @IsAdmin() isAdmin: boolean,
    @CurrentUserId() userId: number,
  ) {
    return this.itemsService.update(
      userId,
      +params.id,
      updateItemDto,
      images,
      isAdmin,
    );
  }

  @Delete(':id')
  @UseGuards(OnlyForPaidGuard, GetIsPaidOrAdminGuard)
  async delete(
    @Param() params: { id: string },
    @Headers() headers: { authorization: string | undefined },
    @IsAdmin() isAdmin: boolean,
    @CurrentUserId() userId: number,
  ): Promise<Item | null> {
    return this.itemsService.delete(userId, +params.id, isAdmin);
  }
}
