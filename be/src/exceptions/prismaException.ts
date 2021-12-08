import { Prisma } from '@prisma/client';
import { BadRequestException, HttpException, HttpStatus } from '@nestjs/common';

export class PrismaException extends HttpException {
  constructor(e: Error) {
    super('Forbidden', HttpStatus.FORBIDDEN);

    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P2002') {
        return new HttpException(
          `Cannot create item. ${
            process.env.NODE_ENV !== 'prod' ? e.message : ''
          }`,
          HttpStatus.CONFLICT,
        );
      }
      if (e.code === 'P2014') {
        return new HttpException(
          `Record should be unique. ${
            process.env.NODE_ENV !== 'prod' ? e.message : ''
          }`,
          HttpStatus.CONFLICT,
        );
      }
    }

    if (e instanceof Prisma.PrismaClientValidationError) {
      return new BadRequestException(
        `Input data is not correct. ${
          process.env.NODE_ENV !== 'prod' ? e.message : ''
        }`,
      );
    }

    return new HttpException('some db error', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
