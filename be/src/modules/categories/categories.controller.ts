import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { Prisma, Category } from '@prisma/client';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Post()
  async create(
    @Body() createCategoryDto: Prisma.CategoryCreateInput,
  ): Promise<Category> {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  async findAll(
    @Query('parentId') parentId: number | undefined,
  ): Promise<{ list: Category[]; parentCategory: Category | null }> {
    return this.categoriesService.findAll({ parentId });
  }

  @Get(':id')
  async findOne(@Param() params: { id: string }): Promise<Category | null> {
    return this.categoriesService.findOne(+params.id);
  }
}
