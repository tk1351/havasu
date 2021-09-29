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

  @Get('/logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.cookie('token', '', { expires: new Date() });
    return response.send(true);
  }

  @Post('/create')
  createUser(@Body() createUserDto: CreateUserDto): Promise<boolean> {
    return this.usersService.createUser(createUserDto);
  }

  @Post('/login')
  async login(
    @Body() authCredentialsDto: AuthCredentialsDto,
    @Res() response: Response,
  ) {
    const token = await this.usersService.login(authCredentialsDto);
    response.cookie('token', token, {
      httpOnly: true,
    });
    return response.json({ token });
  }
}
