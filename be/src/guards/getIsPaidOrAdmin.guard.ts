import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { PrismaService } from 'modules/prisma/prisma.service';

@Injectable()
export class GetIsPaidOrAdminGuard implements CanActivate {
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

      request.user = {
        ...request.user,
        id: userId,
        isPaid: user.isAdmin
          ? true
          : new Date() < new Date(user.paymentExpiredDate),
        isAdmin: user.isAdmin,
      };
    } catch (err) {
      request.user = null;
    }

    return true;
  }
}
