import { Inject, Injectable } from '@nestjs/common';
import { PaymentProvider } from './payment.types';

@Injectable()
export class PaymentService {
  constructor(
    @Inject('PAYMENT_PROVIDER') private paymentProvider: PaymentProvider,
  ) {}

  async createPayment(amount: number, returnUrl: string) {
    return await this.paymentProvider.createPayment(amount, returnUrl);
  }
}
