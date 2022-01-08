import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { User } from '@prisma/client';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from 'decorators/roles.decorator';
import { RegisterUserDto } from 'modules/users/dto/register-user.dto';
import { LoginUserDto } from 'modules/users/dto/login-user.dto';
import { LogoutUserDto } from 'modules/users/dto/logout-user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @Roles('admin')
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param() params: { id: string }): Promise<User> {
    return this.usersService.findOne(+params.id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.update(id, updateUserDto);
  }

  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto): Promise<string> {
    return this.usersService.register(registerUserDto);
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto): Promise<{ token: string }> {
    return this.usersService.login(loginUserDto);
  }

  @Post('logout')
  async logout(@Body() logoutUserDto: LogoutUserDto): Promise<string> {
    return this.usersService.logout(logoutUserDto);
  }
}
