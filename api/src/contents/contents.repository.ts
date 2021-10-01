import { EntityRepository, Repository } from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';
import { Content } from './models/contents.entity';
import { CreateContentDto } from './dto/create-content.dto';

@EntityRepository(Content)
export class ContentsRepository extends Repository<Content> {
  async createContent(createContentDto: CreateContentDto): Promise<Content> {
    const { category, text } = createContentDto;

    const content = this.create();
    content.category = category;
    content.text = text;

    await content.save();

    try {
      return content;
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }
}
