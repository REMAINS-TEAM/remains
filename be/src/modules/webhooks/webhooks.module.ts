import { Module } from '@nestjs/common';
import { WebhooksController } from './webhooks.controller';
import { YookassaWebhookService } from 'modules/webhooks/yookassa/yookassa-webhook.service';

@Module({
  controllers: [WebhooksController],
  providers: [YookassaWebhookService],
})
export class WebhooksModule {}
