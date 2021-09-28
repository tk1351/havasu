import { Repository, EntityRepository, getCustomRepository } from 'typeorm';
import {
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Post } from './models/posts.entity';
import { UsersRepository } from '../users/users.repository';

@EntityRepository(Post)
export class PostsRepository extends Repository<Post> {
  async findPostsByUserId(userId: number): Promise<Post[]> {
    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findOne({ id: userId });
    if (!user) throw new NotFoundException('ユーザーが存在しません');

    const posts = await this.createQueryBuilder('posts')
      .leftJoinAndSelect('posts.tags', 'tags')
      .leftJoinAndSelect('posts.contents', 'contents')
      .where('posts.userId = :userId', { userId: user.id })
      .getMany();

    try {
      return posts;
    } catch {
      throw new InternalServerErrorException(
        '記事取得時にエラーが発生しました',
      );
    }
  }
}
