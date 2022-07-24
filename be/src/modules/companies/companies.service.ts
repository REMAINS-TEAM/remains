import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaException } from 'exceptions/prismaException';
import { RegistrationForm } from '@prisma/client';

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

  async findAllTypes() {
    return Object.values(RegistrationForm);
  }
}
