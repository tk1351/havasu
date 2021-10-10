import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostsRepository } from './posts.repository';
import { PostEntity } from './models/posts.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { User } from '../users/models/users.entity';
import { FindPostsDto } from './dto/find-posts.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { TagsService } from '../tags/tags.service';
import { CreateTagDtos } from '../tags/dto/create-tag.dtos';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostsRepository) private postsRepository: PostsRepository,
    private tagsService: TagsService,
  ) {}

  async findPostsByUserId(
    findPostsDto: FindPostsDto,
    userId: number,
  ): Promise<[PostEntity[], number]> {
    return await this.postsRepository.findPostsByUserId(findPostsDto, userId);
  }

  async findPostById(id: number): Promise<PostEntity> {
    return await this.postsRepository.findPostById(id);
  }

  async createPost(createPostDto: CreatePostDto, user: any): Promise<boolean> {
    return await this.postsRepository.createPost(createPostDto, user);
  }

  async updatePost(
    id: number,
    updatePostDto: UpdatePostDto,
    user: User,
  ): Promise<boolean> {
    const post = await this.postsRepository.findOne({ id });

    if (!post) throw new NotFoundException(`id: ${id}のpostは存在しません`);

    if (post.userId !== user.id)
      throw new UnauthorizedException('権限がありません');

    const { title, content, tags } = updatePostDto;
    post.title = title;
    post.content = content;

    await this.tagsService.deleteTagByPostId(id);

    const createTagDtos: CreateTagDtos[] = tags.map((tag) => {
      return { ...tag, postId: id };
    });

    const newTags = await this.tagsService.createTags(createTagDtos);
    post.tags = newTags;

    await this.postsRepository.save(post);
    return true;
  }

  async deletePost(id: number, user: User): Promise<boolean> {
    return await this.postsRepository.deletePost(id, user);
  }
}
