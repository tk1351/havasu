import { EntityRepository, Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { User } from '../users/models/users.entity';

@EntityRepository(User)
export class AuthRepository extends Repository<User> {
  async getAuthUser(user: User): Promise<User> {
    const found = await this.findOne(
      { id: user.id },
      { select: ['id', 'name'] },
    );

    if (!found) throw new NotFoundException('ユーザーが存在しません');
    return found;
  }
}
