import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { Prisma, User } from "@prisma/client";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Roles } from "../../decorators/roles.decorator";

@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(":id")
  async findOne(@Param() params: { id: string }): Promise<User> {
    return this.usersService.findOne(+params.id);
  }

  @Post()
  @Roles("admin")
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Patch(":id")
  async update(
    @Param("id") id: number,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<User> {
    return this.usersService.update(id, updateUserDto);
  }
}
