"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaException = void 0;
const client_1 = require("@prisma/client");
const common_1 = require("@nestjs/common");
class PrismaException extends common_1.HttpException {
    constructor(e) {
        super('Forbidden', common_1.HttpStatus.FORBIDDEN);
        if (e instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            if (e.code === 'P2002') {
                return new common_1.HttpException(`Cannot create item. ${process.env.NODE_ENV !== 'prod' ? e.message : ''}`, common_1.HttpStatus.CONFLICT);
            }
            if (e.code === 'P2014') {
                return new common_1.HttpException(`Record should be unique. ${process.env.NODE_ENV !== 'prod' ? e.message : ''}`, common_1.HttpStatus.CONFLICT);
            }
        }
        if (e instanceof client_1.Prisma.PrismaClientValidationError) {
            return new common_1.BadRequestException(`Input data is not correct. ${process.env.NODE_ENV !== 'prod' ? e.message : ''}`);
        }
        return new common_1.HttpException('some db error', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
exports.PrismaException = PrismaException;
//# sourceMappingURL=prismaException.js.map