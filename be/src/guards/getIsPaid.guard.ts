import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { PrismaService } from 'modules/prisma/prisma.service';

@Injectable()
export class GetIsPaidGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const userId = request.user?.id;
    if (!userId) {
      request.user = null;
      return true;
    }

    try {
      const user = await this.prisma.user.findUnique({ where: { id: userId } });
      if (!user) {
        request.user = null;
        return true;
      }
      if (new Date() < new Date(user.paymentExpiredDate)) {
        request.user = {
          id: userId,
          isPaid: true,
        };
      } else {
        request.user = {
          id: userId,
          isPaid: false,
        };
      }
    } catch (err) {
      request.user = null;
    }

    return true;
  }
}
