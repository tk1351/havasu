import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { DefaultEntity } from '../../entity';
import { Post } from '../../posts/models/posts.entity';

@Entity({ name: 'tags' })
export class Tag extends DefaultEntity {
  @Column()
  name: string;

  @ManyToOne(() => Post, (post) => post.tags, { orphanedRowAction: 'delete' })
  @JoinColumn({ name: 'postId', referencedColumnName: 'id' })
  post: Post;

  @Column()
  postId: number;
}
