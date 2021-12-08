import { PrismaService } from '../prisma.service';
import { Prisma, Category } from '@prisma/client';
export declare class CategoriesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: Prisma.CategoryCreateInput): Prisma.Prisma__CategoryClient<Category>;
    findAll(): Promise<Category[]>;
    findOne(id: number): Promise<Category>;
}
