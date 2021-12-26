import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Item } from '@prisma/client';
import { PrismaException } from '../../exceptions/prismaException';

@Injectable()
export class ItemsService {
  constructor(private prisma: PrismaService) {}

  async findAll({ categoryId }: { categoryId?: number }): Promise<Item[]> {
    return await this.prisma.item.findMany({
      where: {
        categoryId,
      },
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
