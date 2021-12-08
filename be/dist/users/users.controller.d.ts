import { Prisma, User } from '@prisma/client';
import { UsersService } from './users.service';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    create(createUserDto: Prisma.UserCreateInput): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(params: {
        id: string;
    }): Promise<User>;
}
