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
import path, { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { ITEM_FILES_PATH, MIME_IMAGES_TYPE_MAP } from 'constants/main';
const YandexStorage = require('easy-yandex-s3');

@Injectable()
export class ItemsService {
  constructor(private prisma: PrismaService) {}

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

    // Здесь загружаем картинки из бакета и генерим ссылки

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

  // TODO: сделать нормальную загрузку
  async test() {
    const yandexStorage = new YandexStorage({
      auth: {
        accessKeyId: 'YCAJEHvYwbT6pY4pejq6jxPq-',
        secretAccessKey: 'YCOEmJ-Gxznu4evxZFjlUkS--X5i0SpVyp4iKhKz',
      },
      Bucket: 'remains',
      debug: true, //  удалить в релизе
    });

    const yandex = await yandexStorage.Download('/items/1/do_class.jpeg');
    const file = yandex.data.Body;

    return file;
  }

  async create(
    token: string | undefined,
    data: {
      title: string;
      description: string;
      price: string;
      categoryId: string;
    },
    images: Express.Multer.File[],
  ) {
    // if (!token) {
    //   throw new ForbiddenException(`You are not authorized to create item`);
    // }
    //
    // let foundToken: (Token & { user: User | null }) | null;
    // try {
    //   foundToken = await this.prisma.token.findUnique({
    //     where: { token },
    //     include: { user: true },
    //   });
    // } catch (err) {
    //   throw new PrismaException(err as Error);
    // }
    //
    // if (!foundToken?.user) {
    //   throw new UnauthorizedException(`User does not exist`);
    // }
    //
    // if (new Date() > foundToken.user.paymentExpiredDate) {
    //   throw new ForbiddenException(`Please pay service for this action`);
    // }

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
          userId: 1,
        },
      });
    } catch (err) {
      throw new PrismaException(err as Error);
    }

    if (!newItem) {
      throw new HttpException('Something went wrong when create new item', 500);
    }

    // save files
    let savedFileNames: string[] = [];
    try {
      for (const image of images) {
        const isValid = !!MIME_IMAGES_TYPE_MAP[image.mimetype];
        if (isValid) {
          const name = uuidv4();
          const ext = path.extname(image.originalname);
          const imageName = `${name}${ext || ''}`;

          // WRITE

          savedFileNames.push(imageName);
        }
      }
    } catch (err) {
      throw new HttpException('Something went wrong when save file', 500);
    }

    return newItem;
  }

  async delete(token: string | undefined, id: number) {
    if (!token) {
      throw new ForbiddenException(`You are not authorized to delete item`);
    }

    // let foundToken: (Token & { user: User | null }) | null;
    // try {
    //   foundToken = await this.prisma.token.findUnique({
    //     where: { token },
    //     include: { user: true },
    //   });
    // } catch (err) {
    //   throw new PrismaException(err as Error);
    // }
    //
    // if (!foundToken?.user) {
    //   throw new UnauthorizedException(`User does not exist`);
    // }
    //
    // if (new Date() > foundToken.user.paymentExpiredDate) {
    //   throw new ForbiddenException(`Please pay service for this action`);
    // }

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

    // if (item.userId !== foundToken?.userId) {
    //   throw new ForbiddenException(
    //     `Cannot delete item with id ${id}. It is not your item`,
    //   );
    // }

    // delete all files
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
