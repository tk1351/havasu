import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  UseGuards,
  Delete,
  Query,
  Req,
  Patch,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { PostsService } from './posts.service';
import { PostEntity } from './models/posts.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { GetCurrentUser } from '../auth/get-user.decorator';
import { User } from '../users/models/users.entity';
import { FindPostsDto } from './dto/find-posts.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get('/:id')
  findPostsByUserId(
    @Query() findPostsDto: FindPostsDto,
    @Param('id') userId: number,
  ): Promise<[PostEntity[], number]> {
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
    @Req() request: Request,
  ): Promise<boolean> {
    const user = request.user;
    return this.postsService.createPost(createPostDto, user);
  }

  @Patch('/update/:id')
  @UseGuards(AuthGuard('jwt'))
  updatePost(
    @Param('id') id: number,
    @Body() updatePostDto: UpdatePostDto,
    @GetCurrentUser() user: User,
  ): Promise<boolean> {
    return this.postsService.updatePost(id, updatePostDto, user);
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
