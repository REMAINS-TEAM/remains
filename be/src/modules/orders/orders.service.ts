import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'modules/prisma/prisma.service';
import { OrderStatus } from '@prisma/client';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async setSuccess(id: string) {
    const order = await this.prisma.order.findUnique({ where: { id } });

    if (!order) throw new NotFoundException(`Order ${id} not found`);

    return await this.prisma.order.update({
      where: { id },
      data: { status: OrderStatus.SUCCESS },
    });
  }

  async setCancel(id: string, reason?: string) {
    const order = await this.prisma.order.findUnique({ where: { id } });

    if (!order) throw new NotFoundException(`Order ${id} not found`);

    return await this.prisma.order.update({
      where: { id },
      data: { status: OrderStatus.CANCELED, reason },
    });
  }
}
