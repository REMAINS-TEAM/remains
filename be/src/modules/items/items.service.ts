import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Item } from '@prisma/client';
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
}
