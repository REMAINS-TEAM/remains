import { Injectable } from '@nestjs/common';
import { ICreatePayment, YooCheckout } from '@a2seven/yoo-checkout';
import { v4 as uuidv4 } from 'uuid';
import {
  CreatePaymentResponse,
  PaymentProvider,
} from 'modules/payment/payment.types';

@Injectable()
export class YookassaService implements PaymentProvider {
  checkout: YooCheckout;
  constructor() {
    this.checkout = new YooCheckout({
      shopId: process.env.YOO_KASSA_SHOP_ID || '',
      secretKey: process.env.YOO_KASSA_API_KEY || '',
    });
  }

  async createPayment(amount: number) {
    const idempotenceKey = uuidv4();

    const createPayload: ICreatePayment = {
      amount: {
        value: String(amount),
        currency: 'RUB',
      },
      confirmation: {
        type: 'embedded',
      },
    };

    try {
      return (await this.checkout.createPayment(
        createPayload,
        idempotenceKey,
      )) as CreatePaymentResponse;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
