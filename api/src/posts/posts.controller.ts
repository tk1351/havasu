import { Controller, Get, Param } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post } from './models/posts.entity';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get('/:id')
  findPostsByUserId(@Param('id') userId: number): Promise<Post[]> {
    return this.postsService.findPostsByUserId(userId);
  }
}
