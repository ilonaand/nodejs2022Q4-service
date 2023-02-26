import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  HttpStatus,
  HttpException,
  HttpCode,
} from '@nestjs/common';

import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  private getError(error: any) {
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
  @Post('/track/:id')
  addTrackToFavorites(@Param('id') id: string) {
    try {
      return this.favoritesService.addTrackToFavorites(id);
    } catch (error) {
      this.getError(error);
    }
  }

  @Delete('/track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTrack(@Param('id') id: string) {
    try {
      return this.favoritesService.deleteTrackFromFavorites(id);
    } catch (error) {
      this.getError(error);
    }
  }

  @Post('/album/:id')
  addAlbumToFavorites(@Param('id') id: string): Promise<void> {
    try {
      return this.favoritesService.addAlbumToFavorites(id);
    } catch (error) {
      this.getError(error);
    }
  }

  @Delete('/album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAlbum(@Param('id') id: string) {
    try {
      return this.favoritesService.deleteAlbumFromFavorites(id);
    } catch (error) {
      this.getError(error);
    }
  }

  @Post('/artist/:id')
  addArtistToFavorites(@Param('id') id: string): Promise<void> {
    try {
      return this.favoritesService.addArtistToFavorites(id);
    } catch (error) {
      this.getError(error);
    }
  }

  @Delete('/artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteArtist(@Param('id') id: string) {
    try {
      return this.favoritesService.deleteArtistFromFavorites(id);
    } catch (error) {
      this.getError(error);
    }
  }

  @Get()
  getAll() {
    try {
      return this.favoritesService.getAllFavorites();
    } catch (error) {
      this.getError(error);
    }
  }
}
