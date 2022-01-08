import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { PrismaException } from 'exceptions/prismaException';
import { UpdateUserDto } from './dto/update-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { checkPassword, generateToken, hashPassword } from './users.utils';
import { LoginUserDto } from './dto/login-user.dto';
import { LogoutUserDto } from './dto/logout-user.dto';

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

  async findOneByToken(
    token: string | undefined,
  ): Promise<Omit<User, 'passwordHash'>> {
    if (!token) {
      throw new BadRequestException(`Token is missing`);
    }
    let result;
    try {
      result = await this.prisma.user.findFirst({
        where: {
          tokens: {
            some: { token },
          },
        },
        include: {
          company: true,
        },
      });
    } catch (err) {
      throw new PrismaException(err as Error);
    }

    if (!result) {
      throw new NotFoundException(`User with such token does not exist`);
    }

    const { passwordHash, ...userWithoutPwd } = result;

    return userWithoutPwd;
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
            await this.prisma.token.create({
              data: {
                userId: user.id,
                token,
              },
            });
            return { token };
          }
        }
      } catch (err) {
        throw new PrismaException(err as Error);
      }
    }

    throw new BadRequestException('User not found');
  }

  async logout({ token }: LogoutUserDto) {
    try {
      await this.prisma.token.delete({ where: { token } });
    } catch (err) {
      throw new NotFoundException('No such token');
    }

    return 'OK';
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
