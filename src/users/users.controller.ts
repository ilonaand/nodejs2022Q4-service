import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpException,
  HttpStatus,
  Res,
} from '@nestjs/common';

import { CreateUserDto, UpdatePasswordDto } from './dto/user.dto';
import { ReceivedUserDto } from './dto/user.interface';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get()
  async getAll(): Promise<ReceivedUserDto[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    try {
      return await this.usersService.findOne(id);
    } catch (error) {
      const status =
        error instanceof HttpException
          ? error.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR;
      const message =
        error instanceof HttpException
          ? error.getResponse()
          : 'INTERNAL_SERVER_ERROR';
      throw new HttpException(message, status);
    }
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    try {
      return await this.usersService.updateById(id, updatePasswordDto);
    } catch (error) {
      const status =
        error instanceof HttpException
          ? error.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR;
      const message =
        error instanceof HttpException
          ? error.getResponse()
          : 'INTERNAL_SERVER_ERROR';
      throw new HttpException(message, status);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Res() res) {
    try {
      await this.usersService.deleteById(id);
      res.status(HttpStatus.NO_CONTENT).send();
    } catch (error) {
      const status =
        error instanceof HttpException
          ? error.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR;
      const message =
        error instanceof HttpException
          ? error.getResponse()
          : 'INTERNAL_SERVER_ERROR';
      throw new HttpException(message, status);
    }
  }
}
