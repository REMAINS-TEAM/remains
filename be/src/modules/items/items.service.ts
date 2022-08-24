import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Item } from '@prisma/client';
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
    filter?: { userId?: number; categoryId?: number; companyId?: number };
    isPaid: boolean;
  }): Promise<Item[]> {
    if (!isPaid && filter?.companyId) {
      throw new ForbiddenException(
        'Could not get company items without payment',
      );
    }

    return await this.prisma.item.findMany({
      where: {
        userId: filter?.userId,
        categoryId: filter?.categoryId,
        user: { companyId: filter?.companyId },
      },
      take: limit,
      skip: offset,
      orderBy: [{ updatedAt: 'desc' }, { createdAt: 'desc' }],
    });
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
    images: Express.Multer.File[],
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
    if (item.userId !== userId) {
      throw new ForbiddenException(`It is not your item`);
    }

    if (dto.deletedImageNames?.length) {
      for (const imageName of dto.deletedImageNames) {
        try {
          await this.storage.deleteFile(`items/${item.id}/${imageName}`);
        } catch (e) {
          // skip
        }
      }
    }

    const uploadedImageNames = await this.uploadImages(item.id, images);

    await this.prisma.item.update({
      where: { id: item.id },
      data: {
        ...dto,
        images: [
          ...item.images.filter(
            (imageName) => !dto.deletedImageNames?.includes(imageName),
          ),
          ...uploadedImageNames,
        ],
      },
    });
  }

  async delete(userId: number, id: number) {
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

    if (item.userId !== userId) {
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
