import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Category } from '@prisma/client';
import { PrismaException } from 'exceptions/prismaException';
import { FindAllDto } from './dto/find-all.dto';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.CategoryCreateInput) {
    return this.prisma.category.create({ data });
  }

  async findAll({ parentId, onlyNotEmpty }: FindAllDto) {
    let countSubCategories;
    let categoriesWithCountSub = [];
    let parentCategory: Category | null = null;
    let tree: Category[] = [];

    try {
      if (parentId && Number(parentId) !== 0) {
        parentCategory = await this.prisma.category.findUnique({
          where: { id: +parentId },
        });
      }

      let categories;
      let notEmptyIds: number[] = [];
      if (onlyNotEmpty) {
        const notEmpties = await this.prisma.item.findMany({
          distinct: ['categoryId'],
        });
        notEmptyIds = notEmpties.map((item) => item.categoryId);
      }

      categories = await this.prisma.category.findMany({
        where: {
          parentId,
          id: onlyNotEmpty ? { in: notEmptyIds } : undefined,
        },
        include: {
          _count: { select: { items: true } },
        },
        orderBy: [{ sort: 'asc' }, { title: 'asc' }],
      });

      if (categories.length) {
        for (const category of categories) {
          countSubCategories = await this.prisma.category.count({
            where: { parentId: category.id },
          });

          categoriesWithCountSub.push({
            ...category,
            _count: { ...category._count, subCategories: countSubCategories },
          });
        }
      }

      if (parentCategory) {
        tree = [parentCategory];
        let parentId = parentCategory.parentId;

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
      }
    } catch (err) {
      throw new PrismaException(err as Error);
    }

    return { list: categoriesWithCountSub, parentCategory, tree };
  }

  async findOne(id: number): Promise<Category | null> {
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

    return result;
  }
}
