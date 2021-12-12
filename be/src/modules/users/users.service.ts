import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { User } from "@prisma/client";
import { PrismaException } from "../../exceptions/prismaException";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany({
      include: {
        company: true,
      },
    });
  }

  async findOne(id: number): Promise<User> {
    let result;
    try {
      result = await this.prisma.user.findUnique({
        where: { id },
      });
    } catch (err) {
      throw new PrismaException(err as Error);
    }

    if (!result) {
      throw new NotFoundException(`User with id ${id} does not exist`);
    }

    return result;
  }

  async create(data: CreateUserDto) {
    let result;
    try {
      result = await this.prisma.user.create({ data });
    } catch (err) {
      throw new PrismaException(err as Error);
    }

    return result;
  }

  async update(id: number, data: UpdateUserDto) {
    let result;
    try {
      result = await this.prisma.user.update({ where: { id }, data });
    } catch (err) {
      throw new PrismaException(err as Error);
    }

    return result;
  }
}
