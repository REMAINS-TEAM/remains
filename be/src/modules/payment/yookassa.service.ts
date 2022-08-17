import { Injectable } from '@nestjs/common';
import { ICreatePayment, YooCheckout } from '@a2seven/yoo-checkout';
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

  async createPayment(amount: number, orderId: string) {
    const createPayload: ICreatePayment = {
      amount: {
        value: String(amount),
        currency: 'RUB',
      },
      confirmation: {
        type: 'embedded',
      },
      metadata: { orderId },
    };

    try {
      return (await this.checkout.createPayment(
        createPayload,
        orderId,
      )) as CreatePaymentResponse;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
