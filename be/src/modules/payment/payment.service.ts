import { Inject, Injectable } from '@nestjs/common';
import { PaymentProvider } from './payment.types';

@Injectable()
export class PaymentService {
  constructor(
    @Inject('PAYMENT_PROVIDER') private paymentProvider: PaymentProvider,
  ) {}

  async createPayment(amount: number) {
    const payment = await this.paymentProvider.createPayment(amount);
    return { token: payment.confirmation.confirmation_token };
  }
}
