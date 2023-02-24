import { hash } from 'bcrypt';
import { Exclude, Transform } from 'class-transformer';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  VersionColumn,
  BeforeUpdate,
} from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  login: string;

  @VersionColumn()
  version: number;

  @CreateDateColumn()
  @Transform(({ value }) => new Date(value).getTime())
  createdAt: number;

  @UpdateDateColumn()
  @Transform(({ value }) => new Date(value).getTime())
  updatedAt: number;

  @Exclude()
  @Column()
  password: string;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }
}
