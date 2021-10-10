import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Repository, EntityRepository } from 'typeorm';
import { Tag } from './models/tags.entity';
import { CreateTagDto } from './dto/create-tag.dto';
import { GetCountTagsReturnType } from './types/type';
import { FindTagsDto } from './dto/find-tags.dto';

@EntityRepository(Tag)
export class TagsRepository extends Repository<Tag> {
  async findAllTagsByUserId(userId: number): Promise<Tag[]> {
    const tags = await this.findAllByUserId(userId).getMany();

    if (tags.length === 0)
      throw new NotFoundException(`id: ${userId}のuserのタグは存在しません`);

    return tags;
  }

  async findTagsByPostId(postId: number): Promise<Tag[]> {
    const tags = await this.createQueryBuilder('tags')
      .where('tags.postId = :postId', { postId })
      .getMany();

    if (!tags)
      throw new NotFoundException(`postId: ${postId}のtagは存在しません`);

    try {
      return tags;
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async getCountTags(
    findTagsDto: FindTagsDto,
    userId: number,
  ): Promise<GetCountTagsReturnType[]> {
    const { limit } = findTagsDto;

    const tags = await this.findAllByUserId(userId)
      .select(['tags.name', 'COUNT(*) AS cnt'])
      .limit(limit)
      .groupBy('tags.name')
      .orderBy('cnt', 'DESC')
      .getRawMany<GetCountTagsReturnType>();

    if (tags.length === 0)
      throw new NotFoundException(`id: ${userId}のuserのタグは存在しません`);

    return tags;
  }

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

  async deleteTagByPostId(postId: number): Promise<boolean> {
    const target = await this.findTagsByPostId(postId);

    if (target.length > 0) {
      target.map(async (elm) => await this.delete({ id: elm.id }));
      return true;
    }
  }

  private findAllByUserId(userId: number) {
    return this.leftJoin().where('post.userId = :userId', { userId });
  }

  private leftJoin() {
    return this.createQueryBuilder('tags').leftJoinAndSelect(
      'tags.post',
      'post',
    );
  }
}
