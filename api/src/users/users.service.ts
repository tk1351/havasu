import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtPayload } from './types/types';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository) private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async findAll() {
    return await this.usersRepository.find();
  }

  async createUser(createUserDto: CreateUserDto): Promise<boolean> {
    return await this.usersRepository.createUser(createUserDto);
  }

  async login(authCredentialsDto: AuthCredentialsDto): Promise<string> {
    const userId = await this.usersRepository.validateUserPassword(
      authCredentialsDto,
    );
    if (!userId) throw new UnauthorizedException('認証情報が無効です');

    const payload: JwtPayload = { userId };
    const token = this.jwtService.sign(payload);

    return token;
  }
}
