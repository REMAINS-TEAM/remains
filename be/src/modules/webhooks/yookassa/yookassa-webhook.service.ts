import { Injectable } from '@nestjs/common';
import { PrismaService } from 'modules/prisma/prisma.service';
import { EventType, YookassaWebhookRequest } from './yookassa-webhook.types';

@Injectable()
export class YookassaWebhookService {
  constructor(private prisma: PrismaService) {}

  async eventHandler({ type }: YookassaWebhookRequest) {
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
