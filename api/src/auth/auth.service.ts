import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthRepository } from './auth.repository';
import { User } from '../users/models/users.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthRepository) private authRepository: AuthRepository,
  ) {}

  async getAuthUser(user: User): Promise<User> {
    return await this.authRepository.getAuthUser(user);
  }
}
