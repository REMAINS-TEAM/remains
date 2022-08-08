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
import * as fs from 'fs';
import { join } from 'path';

import { ITEM_FILES_PATH, MIME_IMAGES_TYPE_MAP } from 'constants/main';
import { StorageService } from 'modules/storage/storage.service';
const YandexStorage = require('easy-yandex-s3');

@Injectable()
export class ItemsService {
  constructor(private prisma: PrismaService, private storage: StorageService) {}

  async findAll({
    limit = 10,
    offset = 0,
    filter,
  }: {
    limit?: number;
    offset?: number;
    filter?: { userId?: number; categoryId?: number };
  }): Promise<Item[]> {
    return await this.prisma.item.findMany({
      where: filter,
      take: limit,
      skip: offset,
      orderBy: [{ updatedAt: 'desc' }, { createdAt: 'desc' }],
    });
  }

  async findOne(id: number) {
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
      user: {
        name: user.name,
        phone: user.phone,
        email: user.email,
        company,
      },
    };
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

    // upload files
    const uploadedImageNames: string[] = [];
    try {
      for (const image of images) {
        const isValid = !!MIME_IMAGES_TYPE_MAP[image.mimetype];
        if (isValid) {
          const uploadedFileLocation = await this.storage.upload(
            `/items/${newItem.id}`,
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

    // TODO
    // delete all ITEM files from YANDEX
    fs.rm(
      join(...ITEM_FILES_PATH.split('/'), String(item.id)),
      { recursive: true, force: true },
      () => {},
    );

    return this.prisma.item.delete({
      where: { id },
    });
  }
}
