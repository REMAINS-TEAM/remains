import { Body, Controller, Post } from '@nestjs/common';
import { YookassaWebhookService } from 'modules/webhooks/yookassa/yookassa-webhook.service';
import { YookassaWebhookRequest } from 'modules/webhooks/yookassa/yookassa-webhook.types';

@Controller('webhooks')
export class WebhooksController {
  constructor(private yookassaWebhookService: YookassaWebhookService) {}

  @Post('/yookassa')
  async yookassaWebhook(@Body() body: YookassaWebhookRequest) {
    return this.yookassaWebhookService.eventHandler(body);
  }
}
