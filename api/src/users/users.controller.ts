import { Controller, Get, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  users() {
    return this.usersService.findAll();
  }

  @Post('/create')
  createUser(@Body() createUserDto: CreateUserDto): Promise<boolean> {
    return this.usersService.createUser(createUserDto);
  }

  @Post('/login')
  async login(
    @Body() authCredentialsDto: AuthCredentialsDto,
    @Res() res: Response,
  ) {
    const userId = await this.usersService.login(authCredentialsDto);

    // userIdを渡し、返ってくるjwtをcookieにセットする
    const cookie = this.usersService.getCookieWithJwt(userId);
    res.setHeader('Set-Cookie', cookie);

    return res.send(true);
  }
}
