import { Prisma, Category } from '@prisma/client';
import { CategoriesService } from './categories.service';
export declare class CategoriesController {
    private categoriesService;
    constructor(categoriesService: CategoriesService);
    create(createCategoryDto: Prisma.CategoryCreateInput): Promise<Category>;
    findAll(): Promise<Category[]>;
    findOne(params: {
        id: string;
    }): Promise<Category>;
}
