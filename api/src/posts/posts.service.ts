import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostsRepository } from './posts.repository';
import { PostEntity } from './models/posts.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { User } from '../users/models/users.entity';
import { FindPostsDto } from './dto/find-posts.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostsRepository) private postsRepository: PostsRepository,
  ) {}

  async findPostsByUserId(
    findPostsDto: FindPostsDto,
    userId: number,
  ): Promise<PostEntity[]> {
    return await this.postsRepository.findPostsByUserId(findPostsDto, userId);
  }

  async findPostById(id: number): Promise<PostEntity> {
    return await this.postsRepository.findPostById(id);
  }

  async createPost(createPostDto: CreatePostDto, user: any): Promise<boolean> {
    return await this.postsRepository.createPost(createPostDto, user);
  }

  async deletePost(id: number, user: User): Promise<boolean> {
    return await this.postsRepository.deletePost(id, user);
  }
}
