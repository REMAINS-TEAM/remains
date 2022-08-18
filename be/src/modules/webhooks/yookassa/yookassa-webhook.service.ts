import { Injectable } from '@nestjs/common';
import { PrismaService } from 'modules/prisma/prisma.service';
import { EventType, YookassaWebhookDto } from './yookassa-webhook.types';

@Injectable()
export class YookassaWebhookService {
  constructor(private prisma: PrismaService) {}

  async eventHandler({ type }: YookassaWebhookDto) {
    //TODO
    switch (type) {
      case EventType.PAYMENT_SUCCEEDED:
        break;
      case EventType.PAYMENT_CANCELED:
        break;
    }

    return { status: 'ok' };
  }
}
