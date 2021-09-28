import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PostsService } from './posts.service';
import { PostEntity } from './models/posts.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { GetCurrentUser } from '../auth/get-user.decorator';
import { User } from '../users/models/users.entity';
import { FindPostsDto } from './dto/find-posts.dto';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get('/:id')
  findPostsByUserId(
    @Body() findPostsDto: FindPostsDto,
    @Param('id') userId: number,
  ): Promise<PostEntity[]> {
    return this.postsService.findPostsByUserId(findPostsDto, userId);
  }

  @Get('/get-one/:id')
  findPostById(@Param('id') id: number): Promise<PostEntity> {
    return this.postsService.findPostById(id);
  }

  @Post('/create')
  @UseGuards(AuthGuard('jwt'))
  createPost(
    @Body() createPostDto: CreatePostDto,
    @GetCurrentUser() user: User,
  ): Promise<boolean> {
    return this.postsService.createPost(createPostDto, user);
  }

  @Delete('/delete/:id')
  @UseGuards(AuthGuard('jwt'))
  deletePost(
    @Param('id') id: number,
    @GetCurrentUser() user: User,
  ): Promise<boolean> {
    return this.postsService.deletePost(id, user);
  }
}
