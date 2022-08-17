import { HttpException, Inject, Injectable } from '@nestjs/common';
import { PaymentProvider } from './payment.types';
import { v4 as uuidv4 } from 'uuid';
import { PrismaException } from 'exceptions/prismaException';
import { Order } from '@prisma/client';
import { PrismaService } from 'modules/prisma/prisma.service';

@Injectable()
export class PaymentService {
  constructor(
    private prisma: PrismaService,
    @Inject('PAYMENT_PROVIDER') private paymentProvider: PaymentProvider,
  ) {}

  async createPayment(userId: number, amount: number) {
    const orderId = uuidv4();

    let order: Order | null;
    try {
      order = await this.prisma.order.create({
        data: {
          id: orderId,
          userId,
          amount,
        },
      });
    } catch (err) {
      throw new PrismaException(err as Error);
    }

    if (!order) {
      throw new HttpException('Could not create order', 500);
    }

    const payment = await this.paymentProvider.createPayment(amount, orderId);

    return { token: payment.confirmation.confirmation_token, orderId };
  }
}
