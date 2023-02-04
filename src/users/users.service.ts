import { Injectable } from '@nestjs/common';
import { User, CreateUserDto } from './dto/user.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UsersService {
  private users: Array<User> = [];

  async create(user: CreateUserDto): Promise<User> {
    const newUser = {
      ...user,
      id: uuid(),
      version: 1,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
    };
    this.users.push(newUser);
    return newUser;
  }

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async findOne(id: string): Promise<User> {
    return this.users.find((i) => i.id === id);
  }

  /*  async updateOne(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<User> {
    const user = this.users.find((i) => i.id === id);
    
  } */
}
