import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
    try {
      let categories = await this.prisma.category.findMany({
        where: {
          parentId: parentId ? +parentId : undefined,
        },
        include: {
          _count: { select: { items: true } },
        },
      });

      let parentCategory: { title: string } | null = null;
      if (categories?.[0].parentId) {
        parentCategory = await this.prisma.category.findUnique({
          where: { id: categories[0].parentId },
          select: { title: true },
        });
      }

      if (categories.length) {
        for (const category of categories) {
          countSubCategories = await this.prisma.category.count({
            where: { parentId: category.id },
          });

          categoriesWithCountSub.push({
            ...category,
            parentCategory,
            _count: { ...category._count, subCategories: countSubCategories },
          });
        }
      }
    } catch (err) {
      throw new PrismaException(err as Error);
    }

    return categoriesWithCountSub;
  }

  async findOne(id: number): Promise<{ category: Category; tree: Category[] }> {
    let result;
    try {
      result = await this.prisma.category.findUnique({
        where: { id },
      });
    } catch (err) {
      throw new PrismaException(err as Error);
    }

    if (!result) {
      throw new NotFoundException(`Category with id ${id} does not exist`);
    }

    let tree = [result];
    let parentId = result.parentId;
    try {
      while (parentId !== 0) {
        const category = await this.prisma.category.findUnique({
          where: { id: parentId },
        });
        if (category) {
          parentId = category.parentId;
          tree.unshift(category);
        } else {
          // TODO: может вызвать исключение? Произойдет если одна из категорий удалена например
          break;
        }
      }
    } catch (err) {
      throw new PrismaException(err as Error);
    }

    return { category: result, tree };
  }
}
