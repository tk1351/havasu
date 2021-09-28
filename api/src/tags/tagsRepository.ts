import { Repository, EntityRepository } from 'typeorm';
import { Tag } from './models/tags.entity';

@EntityRepository(Tag)
export class TagsRepository extends Repository<Tag> {}
