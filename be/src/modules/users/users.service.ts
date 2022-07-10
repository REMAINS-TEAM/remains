import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Code, User } from '@prisma/client';
import { PrismaException } from 'exceptions/prismaException';
import { UpdateUserDto } from './dto/update-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { hashPassword } from './users.utils';
import { LoginUserDto } from './dto/login-user.dto';
import { ConfirmCodeDto } from 'modules/users/dto/confirm-code.dto';
import jwt from 'jsonwebtoken';

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

  async register({ password, email, ...data }: RegisterUserDto) {
    try {
      const passwordHash = await hashPassword(password);
      if (passwordHash) {
        await this.prisma.user.create({
          data: { ...data, email: email.toLowerCase(), passwordHash },
        });
        return 'REGISTERED';
      }
    } catch (err) {
      throw new PrismaException(err as Error);
    }

    throw new HttpException('Something went wrong when register new user', 500);
  }

  async login({ phone }: LoginUserDto) {
    let user;
    try {
      user = await this.prisma.user.findUnique({
        where: { phone },
      });
    } catch (err) {
      throw new PrismaException(err as Error);
    }

    if (!user) return 'OK';

    let prevCode;
    try {
      prevCode = await this.prisma.code.findFirst({
        where: { user },
        orderBy: { createdAt: 'desc' },
      });
    } catch (err) {
      throw new PrismaException(err as Error);
    }

    if (
      prevCode &&
      new Date().getTime() - new Date(prevCode.createdAt).getTime() < 60 * 1000
    ) {
      throw new BadRequestException('Code is already sent. Try in 1 min.');
    }

    // запрос на получение кода и звонок с сервиса
    const code = 1234; // temp
    try {
      await this.prisma.code.deleteMany({
        where: { user },
      });
      await this.prisma.code.create({
        data: {
          userId: user.id,
          value: code,
        },
      });
    } catch (err) {
      throw new PrismaException(err as Error);
    }

    return 'OK';
  }

  async confirmCode({ code, phone }: ConfirmCodeDto) {
    let user: User | null;
    try {
      user = await this.prisma.user.findUnique({
        where: { phone },
      });
    } catch (err) {
      throw new PrismaException(err as Error);
    }

    if (!user) {
      throw new BadRequestException('User in not existed or code is invalid');
    }

    let existedCode: Code | null;
    try {
      existedCode = await this.prisma.code.findFirst({
        where: {
          user,
          value: code,
        },
      });
    } catch (err) {
      throw new PrismaException(err as Error);
    }

    if (!existedCode) {
      throw new BadRequestException('User in not existed or code is invalid');
    }

    const token = jwt.sign({ sub: user.id }, 'remains-secret-key');

    return { token };
  }

  async logout(token: string) {
    // try {
    //   await this.prisma.token.delete({ where: { token } });
    // } catch (err) {
    //   throw new NotFoundException('No such token');
    // }

    return { status: 'OK' };
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
