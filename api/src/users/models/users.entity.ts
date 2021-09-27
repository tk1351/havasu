import { Entity, Unique, Column } from 'typeorm';
import { DefaultEntity } from 'src/entity';

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
}
