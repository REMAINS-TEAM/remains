import { Injectable } from '@nestjs/common';
import { ICreatePayment, YooCheckout } from '@a2seven/yoo-checkout';
import uuid from 'uuid';

@Injectable()
export class YookassaService {
  checkout: YooCheckout;
  constructor() {
    this.checkout = new YooCheckout({
      shopId: process.env.YOO_KASSA_SHOP_ID || '',
      secretKey: process.env.YOO_KASSA_API_KEY || '',
    });
  }

  async createPayment(amount: number, returnUrl: string) {
    const idempotenceKey = uuid.v4();

    const createPayload: ICreatePayment = {
      amount: {
        value: String(amount),
        currency: 'RUB',
      },
      payment_method_data: {
        type: 'bank_card',
      },
      confirmation: {
        type: 'redirect',
        return_url: returnUrl,
      },
    };

    try {
      return await this.checkout.createPayment(createPayload, idempotenceKey);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
