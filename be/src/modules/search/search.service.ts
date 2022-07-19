import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaException } from 'exceptions/prismaException';
import { Category, Company, Item } from '@prisma/client';

@Injectable()
export class SearchService {
  constructor(private prisma: PrismaService) {}

  async findAll(searchString: string) {
    let result: {
      categories: Pick<Category, 'id' | 'title'>[];
      items: Pick<Item, 'id' | 'title'>[];
      companies: Pick<Company, 'id' | 'name'>[];
    } | null = null;

    try {
      const categories = await this.prisma.category.findMany({
        where: { title: { contains: searchString } },
        select: { id: true, title: true },
        take: 10,
      });
      const items = await this.prisma.item.findMany({
        where: { title: { contains: searchString } },
        select: { id: true, title: true },
        take: 10,
      });
      const companies = await this.prisma.company.findMany({
        where: { name: { contains: searchString } },
        select: { id: true, name: true },
        take: 10,
      });

      result = { categories, items, companies };
    } catch (err) {
      throw new PrismaException(err as Error);
    }

    return result;
  }
}
