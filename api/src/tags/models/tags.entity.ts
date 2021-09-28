import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { DefaultEntity } from '../../entity';
import { PostEntity } from '../../posts/models/posts.entity';

@Entity({ name: 'tags' })
export class Tag extends DefaultEntity {
  @Column()
  name: string;

  @ManyToOne(() => PostEntity, (post) => post.tags, {
    orphanedRowAction: 'delete',
  })
  @JoinColumn({ name: 'postId', referencedColumnName: 'id' })
  post: PostEntity;

  @Column()
  postId: number;
}
