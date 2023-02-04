import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CreateUserDto, User } from './dto/user.dto';
import { UsersService } from './users.service';
import { validate } from 'uuid';

@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get()
  async getAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async GetUserById(@Param('id') id: string) {
    if (!validate(id))
      throw new HttpException(
        'userId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    const user = await this.usersService.findOne(id);

    if (!user)
      throw new HttpException("user doesn't exist", HttpStatus.NOT_FOUND);
    return user;
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  /*@Put()
  Update(
    @Body() updatePasswordDto: UpdatePasswordDto,
    @Param('id') id: string,
  ) {
    return this.usersService.updateById(id, updatePasswordDto);
  }
  
  @Delete(':id')
  DeleteProduct(@Param('id') id: string) {
    return this.usersService.delete(id);
  } */
}
