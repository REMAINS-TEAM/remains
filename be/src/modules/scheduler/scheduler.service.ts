import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from 'modules/prisma/prisma.service';
import { OrderStatus } from '@prisma/client';
import { NOT_ACTIVATED_LIMIT } from 'constants/main';

@Injectable()
export class SchedulerService {
  constructor(private prisma: PrismaService) {}

  @Cron(CronExpression.EVERY_DAY_AT_1AM)
  async everyNight() {
    // clean not activated users
    await this.prisma.user.deleteMany({
      where: {
        isActivated: false,
        createdAt: {
          lt: new Date(new Date().getTime() - NOT_ACTIVATED_LIMIT),
        },
      },
    });

    // cancel not finished orders
    await this.prisma.order.updateMany({
      where: {
        status: OrderStatus.CREATED,
        createdAt: {
          lt: new Date(new Date().getTime() - NOT_ACTIVATED_LIMIT),
        },
      },
      data: {
        status: OrderStatus.CANCELED,
        reason: `Canceled by timeout ${NOT_ACTIVATED_LIMIT / 3600 / 1000}h`,
      },
    });
  }
}
