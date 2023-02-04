import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { User, CreateUserDto, UpdatePasswordDto } from './dto/user.dto';
import { v4 as uuid, validate } from 'uuid';

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
    if (!validate(id))
      throw new HttpException(
        'userId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    const user = this.users.find((i) => i.id === id);
    if (!user)
      throw new HttpException("user doesn't exist", HttpStatus.NOT_FOUND);
    return user;
  }

  async updateById(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<User> {
    if (!validate(id))
      throw new HttpException(
        'userId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    const user = this.users.find((i) => i.id === id);

    if (!user)
      throw new HttpException("user doesn't exist", HttpStatus.NOT_FOUND);

    if (user.password !== updatePasswordDto.oldPassword)
      throw new HttpException('oldPassword is wrong', HttpStatus.FORBIDDEN);

    this.users = this.users.filter((i) => i !== user);

    const updatedUser = {
      ...user,
      password: updatePasswordDto.newPassword,
      version: user.version + 1,
    };
    this.users = [...this.users, updatedUser];
    return updatedUser;
  }

  async deleteById(id: string) {
    if (!validate(id))
      throw new HttpException(
        'userId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );

    const userIndex = this.users.findIndex((i) => i.id === id);
    if (userIndex < 0)
      throw new HttpException("user doesn't exist", HttpStatus.NOT_FOUND);

    this.users.splice(userIndex, 1);
    return;
  }
}
