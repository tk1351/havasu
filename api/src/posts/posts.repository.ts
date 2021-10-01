import { Repository, EntityRepository, getCustomRepository } from 'typeorm';
import {
  NotFoundException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { PostEntity } from './models/posts.entity';
import { UsersRepository } from '../users/users.repository';
import { CreatePostDto } from './dto/create-post.dto';
import { TagsRepository } from '../tags/tagsRepository';
import { User } from '../users/models/users.entity';
import { FindPostsDto } from './dto/find-posts.dto';

@EntityRepository(PostEntity)
export class PostsRepository extends Repository<PostEntity> {
  async findPostsByUserId(
    findPostsDto: FindPostsDto,
    userId: number,
  ): Promise<PostEntity[]> {
    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findOne({ id: userId });
    if (!user) throw new NotFoundException('ユーザーが存在しません');

    const { offset, limit } = findPostsDto;

    const posts = await this.leftJoin()
      .where('posts.userId = :userId', { userId: user.id })
      .skip(offset)
      .take(limit)
      .orderBy('posts.id', 'DESC')
      .getMany();

    try {
      return posts;
    } catch {
      throw new InternalServerErrorException(
        '記事取得時にエラーが発生しました',
      );
    }
  }

  async findPostById(id: number): Promise<PostEntity> {
    const post = await this.leftJoin()
      .where('posts.id = :id', { id })
      .orderBy('tags.id', 'ASC')
      .getOne();

    if (!post) throw new NotFoundException(`id: ${id}の記事はありません`);

    try {
      return post;
    } catch {
      throw new InternalServerErrorException(
        '記事取得時にエラーが発生しました',
      );
    }
  }

  async createPost(createPostDto: CreatePostDto, user: any): Promise<boolean> {
    const tagsRepository = getCustomRepository(TagsRepository);

    const { title, content, tags } = createPostDto;

    const post = this.create();
    post.title = title;
    post.content = content;
    post.liked = 0;
    post.user = user;

    const newPost = await post.save();

    if (tags) {
      tags.map((tag) =>
        tagsRepository.createTag({ name: tag.name, postId: newPost.id }),
      );
    }

    try {
      return true;
    } catch {
      throw new InternalServerErrorException(
        '記事投稿時にエラーが発生しました',
      );
    }
  }

  async deletePost(id: number, user: User): Promise<boolean> {
    const post = await this.findOne({ id });

    if (post.userId !== user.id)
      throw new UnauthorizedException('権限がありません');

    post.tags = [];

    await this.save(post);
    const result = await this.delete({ id });

    if (result.affected === 0)
      throw new NotFoundException(`id: ${id}の映画は存在しません`);

    try {
      return true;
    } catch {
      throw new InternalServerErrorException(
        '記事の削除時にエラーが発生しました',
      );
    }
  }

  private leftJoin() {
    return this.createQueryBuilder('posts').leftJoinAndSelect(
      'posts.tags',
      'tags',
    );
  }
}
