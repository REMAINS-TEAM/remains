import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import { MAX_ITEMS_FOR_NOT_REGISTERED_USER } from 'constants/main';

export const Pagination = createParamDecorator(
  async (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const userIdFilter = request.query.userId;

    const isPaid = request.user?.isPaid || false;

    const limit = Number(request.query.limit || 5);
    const offset = Number(request.query.offset || 0);

    // User items show fully
    if (userIdFilter === request.user?.id) return { limit, offset };

    let availableLimit = limit;
    if (!isPaid) {
      if (offset >= MAX_ITEMS_FOR_NOT_REGISTERED_USER) {
        throw new BadRequestException('Access is not paid for');
      }
      if (limit > MAX_ITEMS_FOR_NOT_REGISTERED_USER) {
        availableLimit = MAX_ITEMS_FOR_NOT_REGISTERED_USER;
      }
    }

    return { limit: availableLimit, offset };
  },
);
