import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { DefaultEntity } from '../../entity';
import { PostEntity } from '../../posts/models/posts.entity';

@Entity({ name: 'contents' })
export class Content extends DefaultEntity {
  @Column()
  category: number;

  @Column()
  text: string;

  @ManyToOne(() => PostEntity, (post) => post.contents, {
    orphanedRowAction: 'delete',
  })
  @JoinColumn({ name: 'postId', referencedColumnName: 'id' })
  post: PostEntity;

  @Column()
  postId: number;
}
