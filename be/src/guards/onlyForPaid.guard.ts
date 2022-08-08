import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { PrismaService } from 'modules/prisma/prisma.service';

@Injectable()
export class OnlyForPaidGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const userId = request.user?.id;
    if (!userId) return false;

    try {
      const user = await this.prisma.user.findUnique({ where: { id: userId } });
      if (!user) return false;
      if (new Date() < new Date(user.paymentExpiredDate)) return true;
    } catch (err) {
      // skip
    }
    return false;
  }
}
