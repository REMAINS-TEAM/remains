import { Body, Controller, Post } from '@nestjs/common';
import { YookassaWebhookService } from './yookassa/yookassa-webhook.service';
import { YookassaWebhookDto } from './yookassa/yookassa-webhook.types';

@Controller('webhooks')
export class WebhooksController {
  constructor(private yookassaWebhookService: YookassaWebhookService) {}

  @Post('/yookassa')
  async yookassaWebhook(@Body() body: YookassaWebhookDto) {
    return this.yookassaWebhookService.eventHandler(body);
  }
}
