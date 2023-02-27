import { Injectable, ForbiddenException } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/user.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as process from 'process';
import { UserEntity } from '../users/entity/users.entity';
import { RefreshDto } from './dto/refresh.token';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);
    const token = {
      accessToken: await this.generateAccessToken(user),
      refreshToken: await this.generateRefreshToken(user),
    };
    return token;
  }

  async signup(userDto: CreateUserDto) {
    /*  const candidate = await this.userService.findByLogin(userDto.login);
    if (candidate) {
      throw new HttpException(
        'Пользователь с таким login существует',
        HttpStatus.BAD_REQUEST,
      );
    } */
    const hash = await bcrypt.hash(userDto.password, +process.env.CRYPT_SALT);
    const user = await this.userService.create({
      ...userDto,
      password: hash,
    });
    return user;
  }

  async generateAccessToken(user: UserEntity) {
    const payload = { login: user.login, id: user.id };
    return this.jwtService.sign(payload);
  }

  async generateRefreshToken(user: UserEntity) {
    const payload = { login: user.login, id: user.id };
    return this.jwtService.sign(payload);
  }

  async refresh(refreshData: RefreshDto) {
    const user = this.jwtService.verify(refreshData.refreshToken);
    return {
      accessToken: await this.generateAccessToken(user),
      refreshToken: await this.generateRefreshToken(user),
    };
  }

  async validateUser(userDto: CreateUserDto) {
    const user = await this.userService.findByLogin(userDto.login);
    const passwordEquals = await bcrypt.compare(
      userDto.password,
      user.password,
    );

    if (user && passwordEquals) {
      return user;
    }
    throw new ForbiddenException({
      message: 'Uncorrect login or password',
    });
  }
}
