import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  HttpStatus,
  HttpException,
} from '@nestjs/common';

import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  @Post('/track/:id')
  addTrackToFavorites(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return this.favoritesService.addTrackToFavorites(id);
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

  @Delete('/track/:id')
  @HttpCode(204)
  deleteTrack(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return this.favoritesService.deleteTrackFromFavorites(id);
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

  @Post('/album/:id')
  addAlbumToFavorites(@Param('id', ParseUUIDPipe) id: string): Promise<string> {
    try {
      return this.favoritesService.addAlbumToFavorites(id);
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

  @Delete('/album/:id')
  @HttpCode(204)
  deleteAlbum(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return this.favoritesService.deleteAlbumFromFavorites(id);
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

  @Post('/artist/:id')
  addArtistToFavorites(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<string> {
    try {
      return this.favoritesService.addArtistToFavorites(id);
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

  @Delete('/artist/:id')
  @HttpCode(204)
  deleteArtist(@Param('id') id: string) {
    try {
      return this.favoritesService.deleteArtistFromFavorites(id);
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

  @Get()
  getAll() {
    try {
      return this.favoritesService.getAllFavorites();
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
