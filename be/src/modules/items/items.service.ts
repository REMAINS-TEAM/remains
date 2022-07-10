import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Item, User } from '@prisma/client';
import { PrismaException } from 'exceptions/prismaException';
import * as fs from 'fs';
import path, { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { ITEM_FILES_PATH, MIME_IMAGES_TYPE_MAP } from 'constants/main';

@Injectable()
export class ItemsService {
  constructor(private prisma: PrismaService) {}

  async findAll({
    categoryId,
    limit = 10,
    offset = 0,
  }: {
    categoryId?: number;
    limit?: number;
    offset?: number;
  }): Promise<Item[]> {
    return await this.prisma.item.findMany({
      where: {
        categoryId,
      },
      take: limit,
      skip: offset,
      orderBy: [
        {
          updatedAt: 'desc',
        },
        {
          createdAt: 'desc',
        },
      ],
    });
  }

  async findOne(id: number): Promise<Item> {
    let result;
    try {
      result = await this.prisma.item.findUnique({
        where: { id },
      });
    } catch (err) {
      throw new PrismaException(err as Error);
    }

    if (!result) {
      throw new NotFoundException(`Item with id ${id} does not exist`);
    }

    return result;
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
    if (!token) {
      throw new ForbiddenException(`You are not authorized to create item`);
    }
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
      await fs.promises.mkdir(
        join(...ITEM_FILES_PATH.split('/'), String(newItem.id)),
        { recursive: true },
      );
      for (const image of images) {
        const isValid = !!MIME_IMAGES_TYPE_MAP[image.mimetype];
        if (isValid) {
          const name = uuidv4();
          const ext = path.extname(image.originalname);
          const imageName = `${name}${ext || ''}`;

          const fileName = join(
            ...ITEM_FILES_PATH.split('/'),
            String(newItem.id),
            imageName,
          );
          await fs.promises.writeFile(fileName, image.buffer);
          savedFileNames.push(imageName);
        }
      }
    } catch (err) {
      throw new HttpException('Something went wrong when save file', 500);
    }

    let itemWithFiles: Item | null = null;
    try {
      if (savedFileNames.length > 0) {
        itemWithFiles = await this.prisma.item.update({
          where: { id: newItem.id },
          data: {
            images: savedFileNames,
          },
        });
      }
    } catch (err) {
      throw new PrismaException(err as Error);
    }

    return itemWithFiles || newItem;
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
