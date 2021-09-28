import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostsRepository } from './posts.repository';
import { Post } from './models/posts.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostsRepository) private postsRepository: PostsRepository,
  ) {}

  async findPostsByUserId(userId: number): Promise<Post[]> {
    return await this.postsRepository.findPostsByUserId(userId);
  }
}
