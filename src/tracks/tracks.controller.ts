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

import { CreateTrackDto, UpdateTrackDto } from './dto/track.dto';
import { Track } from './dto/track.interface';
import { TracksService } from './tracks.service';

@Controller('track')
export class TracksController {
  constructor(private tracksService: TracksService) {}
  @Get()
  async getAll(): Promise<Track[]> {
    return this.tracksService.findAll();
  }

  @Get(':id')
  async getAlbumById(@Param('id') id: string) {
    try {
      return await this.tracksService.findOne(id);
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
  async create(@Body() createTrackDto: CreateTrackDto) {
    return this.tracksService.create(createTrackDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    try {
      return await this.tracksService.updateById(id, updateTrackDto);
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
      await this.tracksService.deleteById(id);
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
