import { Injectable } from '@nestjs/common';
import { PrismaService } from 'modules/prisma/prisma.service';
import { EventType, YookassaWebhookDto } from './yookassa-webhook.types';
import { PrismaException } from 'exceptions/prismaException';
import { OrderStatus } from '@prisma/client';
import { OrdersService } from 'modules/orders/orders.service';
import { UsersService } from 'modules/users/users.service';
import { ONE_MONTH_PRICE } from 'constants/main';

@Injectable()
export class YookassaWebhookService {
  constructor(
    private ordersService: OrdersService,
    private usersService: UsersService,
  ) {}

  async eventHandler({ type, object }: YookassaWebhookDto) {
    const { orderId } = object.metadata;
    if (!orderId) return { status: 'ok' };

    try {
      switch (type) {
        case EventType.PAYMENT_SUCCEEDED:
          const days = Math.ceil((+object.amount.value / ONE_MONTH_PRICE) * 31);
          const order = await this.ordersService.setSuccess(orderId);
          await this.usersService.extendPaymentExpiredDate(order.userId, days);
          break;
        case EventType.PAYMENT_CANCELED:
          await this.ordersService.setCancel(
            orderId,
            'Canceled by Yookassa webhook',
          );
          break;
      }
    } catch (err) {
      throw new PrismaException(err as Error);
    }

    return { status: 'ok' };
  }
}
