import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto, UpdatePasswordDto } from './dto/user.dto';

import { User, ReceivedUserDto } from './dto/user.interface';
import { v4 as uuid, validate } from 'uuid';

@Injectable()
export class UsersService {
  private users: Array<User> = [];

  async create(user: CreateUserDto): Promise<ReceivedUserDto> {
    const newUser = {
      ...user,
      id: uuid(),
      version: 1,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
    };
    this.users.push(newUser);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...resUser } = newUser;
    return resUser;
  }

  async findAll(): Promise<ReceivedUserDto[]> {
    const resUsers = this.users.map((i) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...resUser } = i;
      return resUser;
    });
    return resUsers;
  }

  async findOne(id: string): Promise<ReceivedUserDto> {
    if (!validate(id))
      throw new HttpException(
        'userId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    const user = this.users.find((i) => i.id === id);
    if (!user)
      throw new HttpException("user doesn't exist", HttpStatus.NOT_FOUND);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...resUser } = user;
    return resUser;
  }

  async updateById(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<ReceivedUserDto> {
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
      updatedAt: new Date().getTime(),
    };
    this.users = [...this.users, updatedUser];
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...resUser } = updatedUser;
    return resUser;
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
