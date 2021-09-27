import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository) private usersRepository: UsersRepository,
  ) {}

  async findAll() {
    return await this.usersRepository.find();
  }

  async createUser(createUserDto: CreateUserDto): Promise<boolean> {
    return await this.usersRepository.createUser(createUserDto);
  }
}
