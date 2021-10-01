import { Entity, Column } from 'typeorm';
import { DefaultEntity } from '../../entity';

@Entity({ name: 'contents' })
export class Content extends DefaultEntity {
  @Column()
  category: number;

  @Column()
  text: string;
}
