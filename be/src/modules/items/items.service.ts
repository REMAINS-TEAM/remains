import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Item, User, Token } from '@prisma/client';
import { PrismaException } from 'exceptions/prismaException';

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
      categoryId: number;
    },
  ) {
    if (!token) {
      throw new ForbiddenException(`You are not authorized to create item`);
    }

    let foundToken: (Token & { user: User | null }) | null;
    try {
      foundToken = await this.prisma.token.findUnique({
        where: { token },
        include: { user: true },
      });
    } catch (err) {
      throw new PrismaException(err as Error);
    }

    if (!foundToken?.user) {
      throw new UnauthorizedException(`User does not exist`);
    }

    if (new Date() > foundToken.user.paymentExpiredDate) {
      throw new ForbiddenException(`Please pay service for this action`);
    }

    return this.prisma.item.create({
      data: {
        title: data.title,
        description: data.description,
        price: +data.price,
        categoryId: data.categoryId,
        images: [],
        userId: foundToken.user.id,
      },
    });
  }

  async delete(token: string | undefined, id: number) {
    if (!token) {
      throw new ForbiddenException(`You are not authorized to delete item`);
    }

    let foundToken: (Token & { user: User | null }) | null;
    try {
      foundToken = await this.prisma.token.findUnique({
        where: { token },
        include: { user: true },
      });
    } catch (err) {
      throw new PrismaException(err as Error);
    }

    if (!foundToken?.user) {
      throw new UnauthorizedException(`User does not exist`);
    }

    if (new Date() > foundToken.user.paymentExpiredDate) {
      throw new ForbiddenException(`Please pay service for this action`);
    }

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

    if (item.userId !== foundToken?.userId) {
      throw new ForbiddenException(
        `Cannot delete item with id ${id}. It is not your item`,
      );
    }

    return this.prisma.item.delete({
      where: { id },
    });
  }
}
