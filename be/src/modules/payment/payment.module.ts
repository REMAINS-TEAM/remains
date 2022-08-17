import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { YookassaService } from 'modules/payment/yookassa.service';

@Module({
  providers: [
    PaymentService,
    { provide: 'PAYMENT_PROVIDER', useClass: YookassaService },
  ],
  exports: [PaymentService],
})
export class PaymentModule {}
