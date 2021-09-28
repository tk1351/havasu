import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { DefaultEntity } from '../../entity';
import { Post } from '../../posts/models/posts.entity';

@Entity({ name: 'contents' })
export class Content extends DefaultEntity {
  @Column()
  category: number;

  @Column()
  text: string;

  @ManyToOne(() => Post, (post) => post.contents, {
    orphanedRowAction: 'delete',
  })
  @JoinColumn({ name: 'postId', referencedColumnName: 'id' })
  post: Post;

  @Column()
  postId: number;
}
