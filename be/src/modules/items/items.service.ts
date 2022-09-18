import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Item, Prisma } from '@prisma/client';
import { PrismaException } from 'exceptions/prismaException';

import { MIME_IMAGES_TYPE_MAP } from 'constants/main';
import { StorageService } from 'modules/storage/storage.service';
import { UpdateItemDto } from 'modules/items/dto/update-item.dto';

@Injectable()
export class ItemsService {
  constructor(private prisma: PrismaService, private storage: StorageService) {}

  async findAll({
    limit = 10,
    offset = 0,
    filter,
    isPaid,
  }: {
    limit?: number;
    offset?: number;
    filter?: {
      userId?: number;
      categoryId?: number;
      companyId?: number;
      brandIds?: number[];
    };
    isPaid: boolean;
  }) {
    if (!isPaid && filter?.companyId) {
      throw new ForbiddenException(
        'Could not get company items without payment',
      );
    }

    const whereFilter: Prisma.ItemWhereInput = {
      userId: filter?.userId,
      categoryId: filter?.categoryId,
      user: { companyId: filter?.companyId },
      OR: filter?.brandIds
        ? [
            { brandId: { in: filter?.brandIds } },
            { brandId: filter?.brandIds?.includes(0) ? null : undefined },
          ]
        : undefined,
    };

    const amount = await this.prisma.item.count({ where: whereFilter });

    const list = await this.prisma.item.findMany({
      where: whereFilter,
      include: { brand: { select: { id: true, title: true } } },
      take: limit,
      skip: offset,
      orderBy: [{ createdAt: 'desc' }],
    });

    return { amount, limit, offset, isOver: offset + limit >= amount, list };
  }

  async findOne(id: number, isPaid: boolean) {
    let result;
    try {
      result = await this.prisma.item.findUnique({
        where: { id },
        include: {
          user: {
            include: {
              company: { select: { id: true, name: true, description: true } },
            },
          },
          brand: { select: { id: true, title: true } },
          category: { select: { title: true, description: true } },
        },
      });
    } catch (err) {
      throw new PrismaException(err as Error);
    }

    if (!result) {
      throw new NotFoundException(`Item with id ${id} does not exist`);
    }

    const {
      user: { company, ...user },
      category,
      ...item
    } = result;

    return {
      ...item,
      category,
      user: isPaid
        ? {
            name: user.name,
            phone: user.phone,
            email: user.email,
            company,
          }
        : null,
    };
  }

  async uploadImages(itemId: number, images: Express.Multer.File[]) {
    const uploadedImageNames: string[] = [];
    try {
      for (const image of images) {
        const isValid = !!MIME_IMAGES_TYPE_MAP[image.mimetype];
        if (isValid) {
          const uploadedFileLocation = await this.storage.upload(
            `/items/${itemId}`,
            image.buffer,
          );

          const splitLocation = uploadedFileLocation.split('/');
          const filename = splitLocation[splitLocation.length - 1];

          uploadedImageNames.push(filename);
        }
      }
    } catch (err) {
      throw new HttpException(
        'Something went wrong when upload file ' + err,
        500,
      );
    }

    return uploadedImageNames;
  }

  async create(
    userId: number,
    data: {
      title: string;
      description: string;
      price: number;
      categoryId: number;
      brandId?: number;
    },
    images: Express.Multer.File[],
  ) {
    if (!images.length) {
      throw new BadRequestException(`Add one image at least`);
    }

    let newItem: Item | null = null;
    try {
      newItem = await this.prisma.item.create({
        data: {
          title: data.title,
          description: data.description,
          price: +data.price,
          categoryId: +data.categoryId,
          brandId: data.brandId ? +data.brandId : null,
          images: [],
          userId,
        },
      });
    } catch (err) {
      throw new PrismaException(err as Error);
    }

    if (!newItem) {
      throw new HttpException('Something went wrong when create new item', 500);
    }

    const uploadedImageNames = await this.uploadImages(newItem.id, images);

    if (uploadedImageNames.length) {
      try {
        newItem = await this.prisma.item.update({
          where: { id: newItem.id },
          data: { images: uploadedImageNames },
        });
      } catch (err) {
        throw new PrismaException(err as Error);
      }
    }

    return newItem;
  }

  async update(
    userId: number,
    id: number,
    dto: UpdateItemDto,
    images?: Express.Multer.File[],
    isAdmin?: boolean,
  ) {
    let item;
    try {
      item = await this.prisma.item.findUnique({ where: { id } });
    } catch (err) {
      throw new PrismaException(err as Error);
    }

    if (!item) {
      throw new NotFoundException(`Item with id ${id} does not exist`);
    }
    if (item.userId !== userId && !isAdmin) {
      throw new ForbiddenException(`It is not your item`);
    }

    const { deletedImageNames, ...data } = dto;

    if (deletedImageNames?.length) {
      for (const imageName of deletedImageNames) {
        try {
          await this.storage.deleteFile(`items/${item.id}/${imageName}`);
        } catch (e) {
          // skip
        }
      }
    }
    let uploadedImageNames: string[] = [];
    if (images?.length) {
      uploadedImageNames = await this.uploadImages(item.id, images);
    }

    let updatedItem;
    try {
      updatedItem = await this.prisma.item.update({
        where: { id: item.id },
        data: {
          ...data,
          images:
            deletedImageNames?.length || uploadedImageNames?.length
              ? [
                  ...item.images.filter(
                    (imageName) => !deletedImageNames?.includes(imageName),
                  ),
                  ...uploadedImageNames,
                ]
              : undefined,
        },
      });
    } catch (err) {
      throw new PrismaException(err as Error);
    }

    if (!updatedItem) {
      throw new BadRequestException('Something went wrong when update item');
    }

    return updatedItem;
  }

  async delete(userId: number, id: number, isAdmin?: boolean) {
    let item: Item | null;
    try {
      item = await this.prisma.item.findUnique({
        where: { id },
      });
    } catch (err) {
      throw new PrismaException(err as Error);
    }

    if (!item) {
      throw new BadRequestException(`Item with id ${id} not found`);
    }

    if (item.userId !== userId && !isAdmin) {
      throw new ForbiddenException(
        `Cannot delete item with id ${id}. It is not your item`,
      );
    }

    await this.storage.deleteFolder(`items/${item.id}`);

    return this.prisma.item.delete({
      where: { id },
    });
  }
}
