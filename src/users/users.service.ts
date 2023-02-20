import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto, UpdatePasswordDto } from './dto/user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entity/users.entity';

import { ReceivedUserDto } from './dto/user.interface';
import { validate } from 'uuid';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async create(userDto: CreateUserDto): Promise<UserEntity> {
    const user = await this.usersRepository.save({
      ...userDto,
      version: 1,
    });
    return await this.findOne(user.id);
  }

  async findAll(): Promise<ReceivedUserDto[]> {
    return this.usersRepository.find();
  }

  async findOne(id: string): Promise<UserEntity> {
    if (!validate(id))
      throw new HttpException(
        'userId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user)
      throw new HttpException("user doesn't exist", HttpStatus.NOT_FOUND);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return user;
  }

  async updateById(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<UserEntity> {
    if (!validate(id))
      throw new HttpException(
        'userId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    const user = await this.findOne(id);

    if (!user)
      throw new HttpException("user doesn't exist", HttpStatus.NOT_FOUND);

    if (user.password !== updatePasswordDto.oldPassword)
      throw new HttpException('oldPassword is wrong', HttpStatus.FORBIDDEN);

    await this.usersRepository.update(id, {
      password: updatePasswordDto.newPassword,
      version: user.version + 1,
      updatedAt: new Date().getTime(),
    });
    return await this.findOne(user.id);
  }

  async deleteById(id: string) {
    if (!validate(id))
      throw new HttpException(
        'userId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );

    const user = await this.findOne(id);
    if (!user)
      throw new HttpException("user doesn't exist", HttpStatus.NOT_FOUND);

    return await this.usersRepository.delete({ id: user.id });
  }
}
