import { Entity, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { DefaultEntity } from '../../entity';
import { User } from '../../users/models/users.entity';
import { Tag } from '../../tags/models/tags.entity';

@Entity({ name: 'posts' })
export class PostEntity extends DefaultEntity {
  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  liked: number;

  @OneToMany(() => Tag, (tags) => tags.post)
  tags: Tag[];

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: User;

  @Column()
  userId: number;
}
