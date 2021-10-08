import { Controller, Get, Param } from '@nestjs/common';
import { TagsService } from './tags.service';
import { Tag } from './models/tags.entity';
import { GetCountTagsReturnType } from './types/type';

@Controller('tags')
export class TagsController {
  constructor(private tagsService: TagsService) {}

  @Get('/:id')
  findAllTagsByUserId(@Param('id') userId: number): Promise<Tag[]> {
    return this.tagsService.findAllTagsByUserId(userId);
  }

  @Get('/count/:id')
  getCountTags(@Param('id') userId: number): Promise<GetCountTagsReturnType[]> {
    return this.tagsService.getCountTags(userId);
  }
}
