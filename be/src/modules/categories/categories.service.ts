import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Category } from '@prisma/client';
import { PrismaException } from '../../exceptions/prismaException';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.CategoryCreateInput) {
    return this.prisma.category.create({ data });
  }

  async findAll({ parentId }: { parentId?: number }): Promise<Category[]> {
    let countSubCategories;
    let categoriesWithCountSub = [];
    const categories = await this.prisma.category.findMany({
      where: {
        parentId,
      },
    });
    if (categories.length) {
      for (const category of categories) {
        countSubCategories = await this.prisma.category.count({
          where: { parentId: category.id },
        });
        categoriesWithCountSub.push({ ...category, countSubCategories });
      }
    }
    return categoriesWithCountSub.length ? categoriesWithCountSub : categories;
  }

  async findOne(
    id: number,
  ): Promise<Category & { countSubCategories: number }> {
    let result;
    let countSubCategories;
    try {
      result = await this.prisma.category.findUnique({
        where: { id },
        include: { items: true },
      });
      if (result) {
        countSubCategories = await this.prisma.category.count({
          where: { parentId: result.id },
        });
      }
    } catch (err) {
      throw new PrismaException(err as Error);
    }

    if (!result) {
      throw new NotFoundException(`Category with id ${id} does not exist`);
    }

    return { ...result, countSubCategories: countSubCategories || 0 };
  }
}
