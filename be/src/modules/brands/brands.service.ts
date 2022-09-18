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
    let categoryIdsTree: number[] = [];

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
      categoryIdsTree = [category.id];

      let isError = false;
      while (parentId !== 0 && !isError) {
        try {
          const category = await this.prisma.category.findUnique({
            where: { id: parentId },
          });
          if (category) {
            parentId = category.parentId;
            categoryIdsTree.push(category.id);
          } else {
            isError = true;
          }
        } catch (e) {
          isError = true;
        }
      }
    }

    try {
      // find brands for categories tree
      brands = await this.prisma.brand.findMany({
        where: {
          categories: {
            some: { id: { in: categoryIdsTree } },
          },
        },
      });
    } catch (err) {
      throw new PrismaException(err as Error);
    }

    return brands;
  }
}
