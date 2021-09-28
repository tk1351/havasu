import { Entity, Unique, Column, OneToMany } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { DefaultEntity } from '../../entity';
import { Post } from '../../posts/models/posts.entity';

@Entity({ name: 'users' })
@Unique(['email'])
export class User extends DefaultEntity {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @Column()
  picture: string;

  @OneToMany(() => Post, (posts) => posts.user)
  posts: Post[];

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
