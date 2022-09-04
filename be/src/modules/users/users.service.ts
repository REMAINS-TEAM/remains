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
import { LoginUserDto } from './dto/login-user.dto';
import { addDays } from 'date-fns';
import jwt from 'jsonwebtoken';
import {
  generateMessageCallUrl,
  getRandomInteger,
} from 'modules/users/users.utils';
import axios from 'axios';
import { PaymentService } from 'modules/payment/payment.service';

const TEST_PHONE = '71234567890';

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

  async findOne(id: number | null): Promise<User> {
    if (!id) {
      throw new BadRequestException('No user id');
    }

    let result;
    try {
      result = await this.prisma.user.findUnique({
        where: { id },
        include: { company: true },
      });
    } catch (err) {
      throw new PrismaException(err as Error);
    }

    if (!result) {
      throw new NotFoundException(`User with id ${id} does not exist`);
    }

    return result;
  }

  async loginOrRegister({ phone }: LoginUserDto) {
    let user: User | null;
    try {
      user = await this.prisma.user.findUnique({
        where: { phone },
      });

      if (!user) {
        // create user with trial period
        user = await this.prisma.user.create({
          data: { phone, paymentExpiredDate: addDays(new Date(), 30) },
        });
      }
    } catch (err) {
      throw new PrismaException(err as Error);
    }

    if (phone === TEST_PHONE) return { status: 'ok' };

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

    const code = getRandomInteger(1000, 9999);
    let smscResponse: { error?: string };
    try {
      smscResponse = await axios.get(
        generateMessageCallUrl(
          phone,
          `Звонок от Sell Remains. Ваш код: ${code}`,
        ),
      );
    } catch (e) {
      throw new HttpException(
        'Something went wrong when try to call ' + JSON.stringify(e),
        500,
      );
    }

    if (smscResponse.error) {
      const errorMessage = smscResponse.error || 'Unknown error';
      throw new HttpException(
        'Something went wrong when try to call. ' + errorMessage,
        500,
      );
    }

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

    return { status: 'ok' };
  }

  async confirmCode({
    code,
    phone,
    loginWithoutCode = false,
  }: {
    code: number;
    phone: string;
    loginWithoutCode?: boolean;
  }) {
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

    if (!loginWithoutCode && phone !== TEST_PHONE) {
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
        throw new BadRequestException('Code is invalid');
      }

      try {
        await this.prisma.code.deleteMany({ where: { user } });
        if (!user.isActivated) {
          await this.prisma.user.update({
            where: { id: user.id },
            data: { isActivated: true },
          });
        }
      } catch (err) {
        throw new PrismaException(err as Error);
      }
    }

    const token = jwt.sign(
      { sub: user.id, pay: user.paymentExpiredDate, admin: user.isAdmin },
      process.env.JWT_SECRET_KEY || 'remains-secret-key',
    );

    return { token };
  }

  async logout() {
    // try {
    //   await this.prisma.token.delete({ where: { token } });
    // } catch (err) {
    //   throw new NotFoundException('No such token');
    // }

    return { status: 'OK' };
  }

  async update(id: number, data: UpdateUserDto) {
    const { name, email, companyId } = data;
    let result;
    try {
      result = await this.prisma.user.update({
        where: { id },
        data: { name, email, companyId },
      });
    } catch (err) {
      throw new PrismaException(err as Error);
    }

    return result;
  }

  async createPayment(
    paymentService: PaymentService,
    userId: number,
    amount: number,
  ) {
    return await paymentService.createPayment(userId, amount);
  }

  async extendPaymentExpiredDate(userId: number, days: number) {
    let user: User | null;
    try {
      user = await this.prisma.user.findUnique({
        where: { id: userId },
      });
    } catch (err) {
      throw new PrismaException(err as Error);
    }

    if (!user) {
      throw new NotFoundException(`User with id ${userId} does not exist`);
    }

    try {
      const fromDate =
        new Date(user.paymentExpiredDate) < new Date()
          ? new Date()
          : user.paymentExpiredDate;
      user = await this.prisma.user.update({
        where: { id: userId },
        data: { paymentExpiredDate: addDays(fromDate, days) },
      });
    } catch (err) {
      throw new PrismaException(err as Error);
    }

    return { paymentExpiredDate: user.paymentExpiredDate };
  }
}
