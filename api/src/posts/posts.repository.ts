import { Repository, EntityRepository, getCustomRepository } from 'typeorm';
import {
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PostEntity } from './models/posts.entity';
import { UsersRepository } from '../users/users.repository';
import { CreatePostDto } from './dto/create-post.dto';
import { ContentsRepository } from '../contents/contents.repository';
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
    const post = await this.leftJoin().where('posts.id = :id', { id }).getOne();

    if (!post) throw new NotFoundException(`id: ${id}の記事はありません`);

    try {
      return post;
    } catch {
      throw new InternalServerErrorException(
        '記事取得時にエラーが発生しました',
      );
    }
  }

  async createPost(createPostDto: CreatePostDto, user: User): Promise<boolean> {
    const contentsRepository = getCustomRepository(ContentsRepository);
    const tagsRepository = getCustomRepository(TagsRepository);

    const { title, contents, tags } = createPostDto;

    const post = this.create();
    post.title = title;
    post.liked = 0;
    post.user = user;

    const newPost = await post.save();

    contents.map((content) =>
      contentsRepository.createContent({
        category: content.category,
        text: content.text,
        postId: newPost.id,
      }),
    );

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

  private leftJoin() {
    return this.createQueryBuilder('posts')
      .leftJoinAndSelect('posts.tags', 'tags')
      .leftJoinAndSelect('posts.contents', 'contents');
  }
}
