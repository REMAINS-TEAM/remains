import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from 'decorators/roles.decorator';
import { RegisterUserDto } from 'modules/users/dto/register-user.dto';
import { LoginUserDto } from 'modules/users/dto/login-user.dto';
import { ConfirmCodeDto } from 'modules/users/dto/confirm-code.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('me')
  async getMe(@Headers() headers: { authorization: string | undefined }) {
    const authHeader = headers.authorization || '';
    const token = authHeader.split(' ')[1];

    return 'TODO';
  }

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
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.usersService.login(loginUserDto);
  }

  @Post('code')
  async code(@Body() confirmCodeDto: ConfirmCodeDto) {
    return this.usersService.confirmCode(confirmCodeDto);
  }

  @Post('logout')
  async logout(
    @Headers() headers: { authorization: string | undefined },
  ): Promise<{ status: string }> {
    const authHeader = headers.authorization || '';
    const token = authHeader.split(' ')[1];
    return this.usersService.logout(token);
  }
}
