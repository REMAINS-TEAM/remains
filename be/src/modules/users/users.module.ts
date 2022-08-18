import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PaymentModule } from 'modules/payment/payment.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [PaymentModule],
  exports: [UsersService],
})
export class UsersModule {}
