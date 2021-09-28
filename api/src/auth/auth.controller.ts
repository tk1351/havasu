import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { GetCurrentUser } from './get-user.decorator';
import { User } from '../users/models/users.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  getAuthUser(@GetCurrentUser() user: User): Promise<User> {
    return this.authService.getAuthUser(user);
  }
}
