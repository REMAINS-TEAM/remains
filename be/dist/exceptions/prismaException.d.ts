import { HttpException } from '@nestjs/common';
export declare class PrismaException extends HttpException {
    constructor(e: Error);
}
