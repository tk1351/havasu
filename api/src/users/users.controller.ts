import { Controller, Get, Post, Body } from '@nestjs/common';
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
  async login(@Body() authCredentialsDto: AuthCredentialsDto): Promise<string> {
    return await this.usersService.login(authCredentialsDto);
  }
}
