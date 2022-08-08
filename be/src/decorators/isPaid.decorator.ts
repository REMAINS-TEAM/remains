import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const IsPaid = createParamDecorator(
  async (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    return request?.user?.isPaid || false;
  },
);
