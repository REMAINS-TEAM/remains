import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { PrismaException } from '../../exceptions/prismaException';
import { UpdateUserDto } from './dto/update-user.dto';
import { RegisterUserDto } from 'modules/users/dto/register-user.dto';
import {
  checkPassword,
  generateToken,
  hashPassword,
} from 'modules/users/users.utils';
import { LoginUserDto } from 'modules/users/dto/login-user.dto';

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

  async login({ login, password }: LoginUserDto) {
    let user;
    try {
      const users = await this.prisma.user.findMany({
        where: {
          OR: [{ email: login.toLowerCase() }, { phone: login }],
        },
      });
      user = users[0];
    } catch (err) {
      throw new PrismaException(err as Error);
    }

    if (user) {
      try {
        const result = await this.prisma.user.findUnique({
          where: { id: user.id },
        });
        if (result?.passwordHash) {
          const compared = await checkPassword(password, result.passwordHash);
          if (compared) {
            const token = generateToken();
            return { token };
          }
        }
      } catch (err) {
        throw new PrismaException(err as Error);
      }
    }

    throw new BadRequestException('User not found');
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
