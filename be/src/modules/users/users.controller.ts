import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from 'decorators/roles.decorator';
import { LoginUserDto } from 'modules/users/dto/login-user.dto';
import { ConfirmCodeDto } from 'modules/users/dto/confirm-code.dto';
import { OnlyForLoggedGuard } from 'guards/onlyForLogged.guard';
import { CurrentUserId } from 'decorators/current-user.decorator';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('me')
  @UseGuards(OnlyForLoggedGuard)
  async getMe(@CurrentUserId() userId: number | null) {
    return this.usersService.findOne(userId);
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

  @Patch()
  @UseGuards(OnlyForLoggedGuard)
  async updateCurrent(
    @CurrentUserId() userId: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.update(userId, updateUserDto);
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.usersService.loginOrRegister(loginUserDto);
  }

  @Post('code')
  @HttpCode(200)
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
