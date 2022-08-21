import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaException } from 'exceptions/prismaException';
import { Company, RegistrationForm } from '@prisma/client';
import { CreateCompanyDto } from 'modules/companies/dto/create-company.dto';

@Injectable()
export class CompaniesService {
  constructor(private prisma: PrismaService) {}

  async findAll(name?: string) {
    let result;

    try {
      result = await this.prisma.company.findMany({
        where: { name: { contains: name, mode: 'insensitive' } },
        select: { id: true, name: true, description: true, type: true },
      });
    } catch (err) {
      throw new PrismaException(err as Error);
    }

    return result;
  }

  async findOne(id: number) {
    let company;

    try {
      company = await this.prisma.company.findUnique({
        where: { id },
        select: {
          id: true,
          name: true,
          description: true,
          type: true,
          createdAt: true,
        },
      });
    } catch (err) {
      throw new PrismaException(err as Error);
    }

    if (!company) {
      throw new NotFoundException(`Company with id ${id} not found`);
    }

    return company;
  }

  async findAllTypes() {
    return Object.values(RegistrationForm);
  }

  async create(data: CreateCompanyDto) {
    let result;
    try {
      result = await this.prisma.company.create({ data });
    } catch (err) {
      throw new PrismaException(err as Error);
    }

    return result;
  }
}
