import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Favorites, FavoritesRepsonse } from './dto/favorites.interface';
import { validate } from 'uuid';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class FavoritesService {
  private favorites: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };
  @Inject()
  private databaseService: DatabaseService;

  async addTrackToFavorites(id: string): Promise<string> {
    if (!validate(id))
      throw new HttpException(
        'trackId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );

    if (!this.databaseService.entities.tracks.find((i) => i.id === id)) {
      throw new HttpException(
        "artist doesn't exist",
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    if (this.favorites.tracks.includes(id)) return;
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
    if (tracks.length === 0) {
      throw new HttpException("track doesn't exist", HttpStatus.NOT_FOUND);
    }
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

    if (!this.databaseService.entities.albums.find((i) => i.id === id)) {
      throw new HttpException(
        "artist doesn't exist",
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    if (this.favorites.albums.includes(id)) return;
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
    if (albums.length === 0) {
      throw new HttpException("track doesn't exist", HttpStatus.NOT_FOUND);
    }
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
    if (!this.databaseService.entities.artists.find((i) => i.id === id)) {
      throw new HttpException(
        "artist doesn't exist",
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    if (this.favorites.artists.includes(id)) return;
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
    if (artists.length === 0) {
      throw new HttpException("track doesn't exist", HttpStatus.NOT_FOUND);
    }
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
      this.databaseService.entities.artists.find((i) => i.id === id),
    );

    const albumsPromise = albumsIds.map((id) =>
      this.databaseService.entities.albums.find((i) => i.id === id),
    );

    const tracksPromise = tracksIds.map((id) =>
      this.databaseService.entities.tracks.find((i) => i.id === id),
    );

    const artists = (await Promise.all(artistsPromise)).filter(Boolean);
    const albums = (await Promise.all(albumsPromise)).filter(Boolean);
    const tracks = (await Promise.all(tracksPromise)).filter(Boolean);

    const favorites: FavoritesRepsonse = {
      artists: artists,
      albums: albums,
      tracks: tracks,
    };

    return favorites;
  }
}
