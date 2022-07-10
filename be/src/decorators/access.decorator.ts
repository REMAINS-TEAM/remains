import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { PrismaService } from 'modules/prisma/prisma.service';

export const Access = createParamDecorator(
  async (data: string, ctx: ExecutionContext) => {
    const prisma = new PrismaService();
    const request = ctx.switchToHttp().getRequest();
    const authHeader = request.headers.authorization || '';
    const token = authHeader.split(' ')[1];

    if (!token) {
      return false;
    }

    // Check auth
    // const tokenFromDb = await prisma.token.findUnique({
    //   where: {
    //     token,
    //   },
    // });
    // if (!tokenFromDb) {
    //   return false;
    // }
    //
    // // Check paymentExpiredDate
    // const user = await prisma.user.findFirst({
    //   where: {
    //     tokens: {
    //       some: {
    //         token,
    //       },
    //     },
    //   },
    // });
    //
    // if (!user?.paymentExpiredDate) {
    //   return false;
    // } else if (user?.paymentExpiredDate < new Date()) {
    //   return false;
    // }

    return true;
  },
);
