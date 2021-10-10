import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TagsRepository } from './tags.repository';
import { Tag } from './models/tags.entity';
import { GetCountTagsReturnType } from './types/type';
import { FindTagsDto } from './dto/find-tags.dto';
import { CreateTagDtos } from './dto/create-tag.dtos';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(TagsRepository) private tagsRepository: TagsRepository,
  ) {}

  async findAllTagsByUserId(userId: number): Promise<Tag[]> {
    return await this.tagsRepository.findAllTagsByUserId(userId);
  }

  async findTagsByPostId(postId: number): Promise<Tag[]> {
    return await this.tagsRepository.findTagsByPostId(postId);
  }

  async getCountTags(
    findTagsDto: FindTagsDto,
    userId: number,
  ): Promise<GetCountTagsReturnType[]> {
    return await this.tagsRepository.getCountTags(findTagsDto, userId);
  }

  async createTags(createTagDtos: CreateTagDtos[]): Promise<Tag[]> {
    const newTags = Promise.all(
      createTagDtos.map(async (createTagDto) => {
        const newTag = await this.tagsRepository.createTag(createTagDto);
        return newTag;
      }),
    );
    return newTags;
  }

  async deleteTagByPostId(postId: number): Promise<boolean> {
    return await this.tagsRepository.deleteTagByPostId(postId);
  }
}
