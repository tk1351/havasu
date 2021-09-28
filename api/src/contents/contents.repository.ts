import { EntityRepository, Repository } from 'typeorm';
import { Content } from './models/contents.entity';

@EntityRepository(Content)
export class ContentsRepository extends Repository<Content> {}
