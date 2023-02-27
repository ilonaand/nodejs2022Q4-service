import {
  HttpException,
  HttpStatus,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { CreateUserDto } from '../users/dto/user.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
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
    return {
      accessToken: await this.generateAccessToken(user),
      refreshToken: await this.generateRefreshToken(user),
    };
  }

  async signUp(userDto: CreateUserDto) {
    const candidate = await this.userService.findByLogin(userDto.login);
    if (candidate) {
      throw new HttpException(
        'Пользователь с таким login существует',
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = await this.userService.create(userDto);
    return user;
  }

  async generateAccessToken(user: UserEntity) {
    const payload = { login: user.login, id: user.id };
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET_KEY || 'JWT_SECRET_KEY',
      expiresIn: process.env.TOKEN_EXPIRE_TIME || '1h',
    });
  }

  async generateRefreshToken(user: UserEntity) {
    const payload = { login: user.login, id: user.id };
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET_REFRESH_KEY || 'JWT_SECRET_REFRESH_KEY',
      expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME || '24h',
    });
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
