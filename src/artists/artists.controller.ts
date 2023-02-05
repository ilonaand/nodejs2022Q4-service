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

import { CreateArtistDto, UpdateArtistDto } from './dto/artist.dto';
import { Artist } from './dto/artist.interface';
import { ArtistsService } from './artists.service';

@Controller('artist')
export class ArtistsController {
  constructor(private artistsService: ArtistsService) {}
  @Get()
  async getAll(): Promise<Artist[]> {
    return this.artistsService.findAll();
  }

  @Get(':id')
  async getartistById(@Param('id') id: string) {
    try {
      return await this.artistsService.findOne(id);
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
  async create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistsService.create(createArtistDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePasswordDto: UpdateArtistDto,
  ) {
    try {
      return await this.artistsService.updateById(id, updatePasswordDto);
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
      await this.artistsService.deleteById(id);
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
