import { Module } from '@nestjs/common';
import { WebhooksController } from './webhooks.controller';
import { YookassaWebhookService } from 'modules/webhooks/yookassa/yookassa-webhook.service';
import { OrdersModule } from 'modules/orders/orders.module';
import { UsersModule } from 'modules/users/users.module';

@Module({
  controllers: [WebhooksController],
  providers: [YookassaWebhookService],
  imports: [OrdersModule, UsersModule],
})
export class WebhooksModule {}
