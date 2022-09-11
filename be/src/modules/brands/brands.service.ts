import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'modules/prisma/prisma.service';
import { PrismaException } from 'exceptions/prismaException';
import { FindAllDto } from './dto/find-all.dto';
import { Brand, Category } from '@prisma/client';

@Injectable()
export class BrandsService {
  constructor(private prisma: PrismaService) {}

  async findAll({ categoryId }: FindAllDto) {
    let brands: Brand[] | null;
    let rootCategory = null;

    if (categoryId !== undefined) {
      let category: Category | null;
      try {
        category = await this.prisma.category.findUnique({
          where: { id: categoryId },
        });
      } catch (err) {
        throw new PrismaException(err as Error);
      }

      if (!category) throw new NotFoundException('No such category');

      let parentId = category.parentId;
      if (parentId === 0) {
        rootCategory = category;
      } else {
        while (parentId !== 0) {
          const category = await this.prisma.category.findUnique({
            where: { id: parentId },
          });
          if (category) {
            parentId = category.parentId;
            rootCategory = category;
          } else {
            break;
          }
        }
      }

      if (!rootCategory) return [];
    }

    try {
      // find brands for root category
      brands = await this.prisma.brand.findMany({
        where: {
          categories: {
            some: { id: rootCategory?.id },
          },
        },
      });
    } catch (err) {
      throw new PrismaException(err as Error);
    }

    return brands;
  }
}
