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
    const newUser = new UserEntity();
    Object.assign(newUser, userDto);

    return await this.usersRepository.save(newUser);
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

    if (updatePasswordDto.oldPassword !== user.password)
      throw new HttpException('oldPassword is wrong', HttpStatus.FORBIDDEN);

    Object.assign(user, { password: updatePasswordDto.newPassword });

    return await this.usersRepository.save(user);
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

  async findByLogin(login: string): Promise<UserEntity> {
    const user = await this.usersRepository.findOne({ where: { login } });
    if (!user)
      throw new HttpException("user doesn't exist", HttpStatus.NOT_FOUND);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return user;
  }
}
