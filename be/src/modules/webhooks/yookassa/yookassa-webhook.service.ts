import { Injectable } from '@nestjs/common';
import { Event, YookassaWebhookDto } from './yookassa-webhook.types';
import { PrismaException } from 'exceptions/prismaException';
import { OrdersService } from 'modules/orders/orders.service';
import { UsersService } from 'modules/users/users.service';
import { ONE_MONTH_PRICE } from 'constants/main';

@Injectable()
export class YookassaWebhookService {
  constructor(
    private ordersService: OrdersService,
    private usersService: UsersService,
  ) {}

  async eventHandler({ event, object }: YookassaWebhookDto) {
    const { orderId } = object.metadata;
    if (!orderId) return { status: 'ok' };

    try {
      switch (event) {
        case Event.PAYMENT_SUCCEEDED:
          const days = Math.ceil((+object.amount.value / ONE_MONTH_PRICE) * 31);
          const order = await this.ordersService.setSuccess(orderId);
          await this.usersService.extendPaymentExpiredDate(order.userId, days);
          break;
        case Event.PAYMENT_CANCELED:
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
