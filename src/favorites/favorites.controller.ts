import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  HttpStatus,
  HttpException,
  Res,
} from '@nestjs/common';

import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  @Post('/track/:id')
  addTrackToFavorites(@Param('id') id: string) {
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
  deleteTrack(@Param('id') id: string, @Res() res) {
    try {
      this.favoritesService.deleteTrackFromFavorites(id);
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

  @Post('/album/:id')
  addAlbumToFavorites(@Param('id') id: string): Promise<string> {
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
  deleteAlbum(@Param('id') id: string, @Res() res) {
    try {
      this.favoritesService.deleteAlbumFromFavorites(id);
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

  @Post('/artist/:id')
  addArtistToFavorites(@Param('id') id: string): Promise<string> {
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
  deleteArtist(@Param('id') id: string, @Res() res) {
    try {
      this.favoritesService.deleteArtistFromFavorites(id);
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
