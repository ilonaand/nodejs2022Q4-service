import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';

import { AlbumsService } from '../albums/albums.service';
import { ArtistsService } from '../artists/artists.service';
import { TracksService } from '../tracks/tracks.service';
import { Favorites, FavoritesRepsonse } from './dto/favorites.interface';
import { validate } from 'uuid';

@Injectable()
export class FavoritesService {
  private favorites: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };
  @Inject(ArtistsService)
  private artistService: ArtistsService;
  @Inject(forwardRef(() => AlbumsService))
  private albumService: AlbumsService;
  @Inject(TracksService)
  private trackService: TracksService;

  async addTrackToFavorites(id: string): Promise<string> {
    if (!validate(id))
      throw new HttpException(
        'trackId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );

    try {
      await this.trackService.findOne(id);
    } catch (error) {
      throw new HttpException(
        "track doesn't exist",
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    this.favorites.tracks.push(id);
    return 'Track added';
  }

  async deleteTrackFromFavorites(id: string): Promise<string> {
    if (!validate(id))
      throw new HttpException(
        'trackId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );

    const tracks = [...this.favorites.tracks];
    const newTracks = tracks.filter((trackId) => trackId !== id);

    if (tracks.length === newTracks.length) {
      throw new HttpException("track doesn't exist", HttpStatus.NOT_FOUND);
    }
    this.favorites.tracks = newTracks;
    return 'Track deleted';
  }

  async addAlbumToFavorites(id: string): Promise<string> {
    if (!validate(id))
      throw new HttpException(
        'albumId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );

    try {
      await this.albumService.findOne(id);
    } catch (error) {
      throw new HttpException(
        "track doesn't exist",
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    this.favorites.albums.push(id);
    return 'Album added';
  }

  async deleteAlbumFromFavorites(id: string): Promise<string> {
    if (!validate(id))
      throw new HttpException(
        'albumId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );

    const albums = [...this.favorites.albums];
    const newAlbums = albums.filter((albumId) => albumId !== id);

    if (albums.length === newAlbums.length) {
      throw new HttpException("album doesn't exist", HttpStatus.NOT_FOUND);
    }
    this.favorites.albums = newAlbums;
    return 'Album deleted';
  }

  async addArtistToFavorites(id: string): Promise<string> {
    if (!validate(id))
      throw new HttpException(
        'artistId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    try {
      await this.artistService.findOne(id);
    } catch (error) {
      throw new HttpException(
        "artist doesn't exist",
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    this.favorites.artists.push(id);
    return 'Artist added';
  }

  async deleteArtistFromFavorites(id: string): Promise<string> {
    if (!validate(id))
      throw new HttpException(
        'artistId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    const artists = [...this.favorites.artists];
    const newArtists = artists.filter((artistId) => artistId !== id);

    if (artists.length === newArtists.length) {
      throw new HttpException("artist doesn't exist", HttpStatus.NOT_FOUND);
    }
    this.favorites.artists = newArtists;
    return 'Artist deleted';
  }

  async getAllFavorites(): Promise<FavoritesRepsonse> {
    const artistsIds = this.favorites.artists;
    const albumsIds = this.favorites.albums;
    const tracksIds = this.favorites.tracks;

    const artistsPromise = artistsIds.map((id) =>
      this.artistService.findOne(id),
    );

    const albumsPromise = albumsIds.map((id) => this.albumService.findOne(id));

    const tracksPromise = tracksIds.map((id) => this.trackService.findOne(id));

    const artists = await Promise.all(artistsPromise);
    const albums = await Promise.all(albumsPromise);
    const tracks = await Promise.all(tracksPromise);

    const favorites: FavoritesRepsonse = {
      artists: artists,
      albums: albums,
      tracks: tracks,
    };

    return favorites;
  }
}
