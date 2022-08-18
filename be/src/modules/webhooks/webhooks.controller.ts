import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { YookassaWebhookService } from './yookassa/yookassa-webhook.service';
import { YookassaWebhookDto } from './yookassa/yookassa-webhook.types';

@Controller('webhooks')
export class WebhooksController {
  constructor(private yookassaWebhookService: YookassaWebhookService) {}

  @Post('/yookassa')
  @HttpCode(200)
  async yookassaWebhook(@Body() body: YookassaWebhookDto) {
    return this.yookassaWebhookService.eventHandler(body);
  }
}
