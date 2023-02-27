import { Exclude } from 'class-transformer';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  login: string;

  @VersionColumn()
  version: number;

  @CreateDateColumn({
    transformer: {
      from: (value: Date) => value.getTime(),
      to: (value: Date) => value,
    },
  })
  createdAt: number;
  @UpdateDateColumn({
    transformer: {
      from: (value: Date) => value.getTime(),
      to: (value: Date) => value,
    },
  })
  updatedAt: number;

  @Exclude()
  @Column()
  password: string;

  toResponse() {
    const { id, login, version, createdAt, updatedAt } = this;
    return { id, login, version, createdAt, updatedAt };
  }

  /* @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  } */
}
