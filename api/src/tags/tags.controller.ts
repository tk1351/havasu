import { Controller, Get, Param, Query } from '@nestjs/common';
import { TagsService } from './tags.service';
import { Tag } from './models/tags.entity';
import { GetCountTagsReturnType } from './types/type';
import { FindTagsDto } from './dto/find-tags.dto';

@Controller('tags')
export class TagsController {
  constructor(private tagsService: TagsService) {}

  @Get('/:id')
  findAllTagsByUserId(@Param('id') userId: number): Promise<Tag[]> {
    return this.tagsService.findAllTagsByUserId(userId);
  }

  @Get('/post/:id')
  findTagsByPostId(@Param('id') postId: number): Promise<Tag[]> {
    return this.tagsService.findTagsByPostId(postId);
  }

  @Get('/count/:id')
  getCountTags(
    @Query() findTagsDto: FindTagsDto,
    @Param('id') userId: number,
  ): Promise<GetCountTagsReturnType[]> {
    return this.tagsService.getCountTags(findTagsDto, userId);
  }
}
