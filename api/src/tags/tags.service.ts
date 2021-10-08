import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TagsRepository } from './tags.repository';
import { Tag } from './models/tags.entity';
import { GetCountTagsReturnType } from './types/type';
import { FindTagsDto } from './dto/find-tags.dto';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(TagsRepository) private tagsRepository: TagsRepository,
  ) {}

  async findAllTagsByUserId(userId: number): Promise<Tag[]> {
    return await this.tagsRepository.findAllTagsByUserId(userId);
  }

  async getCountTags(
    findTagsDto: FindTagsDto,
    userId: number,
  ): Promise<GetCountTagsReturnType[]> {
    return await this.tagsRepository.getCountTags(findTagsDto, userId);
  }
}
