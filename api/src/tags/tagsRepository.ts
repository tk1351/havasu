import { Repository, EntityRepository } from 'typeorm';
import { Tag } from './models/tags.entity';
import { CreateTagDto } from './dto/create-tag.dto';
import { InternalServerErrorException } from '@nestjs/common';

@EntityRepository(Tag)
export class TagsRepository extends Repository<Tag> {
  async createTag(createTagDto: CreateTagDto): Promise<Tag> {
    const { name, postId } = createTagDto;

    const tag = this.create();
    tag.name = name;
    tag.postId = postId;

    await tag.save();

    try {
      return tag;
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }
}
