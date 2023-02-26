import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FavoritesRepsonse } from './dto/favorites.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FavoritesEntity } from './entity/favorits.entity';
import { AlbumEntity } from '../albums/entity/albums.entity';
import { ArtistEntity } from '../artists/entity/artists.entity';
import { TrackEntity } from '../tracks/entity/tracks.entity';
import { validate } from 'uuid';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(FavoritesEntity)
    private readonly favoritesRepository: Repository<FavoritesEntity>,
    @InjectRepository(AlbumEntity)
    private readonly albumRepository: Repository<AlbumEntity>,
    @InjectRepository(ArtistEntity)
    private readonly artistRepository: Repository<ArtistEntity>,
    @InjectRepository(TrackEntity)
    private readonly trackRepository: Repository<TrackEntity>,
  ) {}

  async addTrackToFavorites(id: string): Promise<void> {
    if (!validate(id))
      throw new HttpException(
        'userId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    const track = await this.trackRepository.findOneBy({ id });

    if (!track) {
      throw new HttpException(
        "track doesn't exist",
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    await this.favoritesRepository.save({
      trackId: id,
    });
  }

  async deleteTrackFromFavorites(id: string): Promise<void> {
    if (!validate(id))
      throw new HttpException(
        'userId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    const track = await this.trackRepository.findOneBy({ id });

    if (!track) {
      throw new HttpException("track doesn't exist", HttpStatus.NOT_FOUND);
    }

    await this.favoritesRepository.delete({
      trackId: id,
    });
  }

  async addAlbumToFavorites(id: string): Promise<void> {
    if (!validate(id))
      throw new HttpException(
        'userId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    const album = await this.albumRepository.findOneBy({ id });

    if (!album) {
      throw new HttpException(
        "album doesn't exist",
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    await this.favoritesRepository.save({
      albumId: id,
    });
  }

  async deleteAlbumFromFavorites(id: string): Promise<void> {
    if (!validate(id))
      throw new HttpException(
        'userId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    const album = await this.albumRepository.findOneBy({ id });

    if (!album) {
      throw new HttpException("album doesn't exist", HttpStatus.NOT_FOUND);
    }

    await this.favoritesRepository.delete({
      albumId: id,
    });
  }

  async addArtistToFavorites(id: string): Promise<void> {
    if (!validate(id))
      throw new HttpException(
        'userId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    const artist = await this.artistRepository.findOneBy({ id });

    if (!artist) {
      throw new HttpException(
        "artist doesn't exist",
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    await this.favoritesRepository.save({
      artistId: id,
    });
  }

  async deleteArtistFromFavorites(id: string): Promise<void> {
    if (!validate(id))
      throw new HttpException(
        'userId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    const artist = await this.artistRepository.findOneBy({ id });

    if (!artist) {
      throw new HttpException("artist doesn't exist", HttpStatus.NOT_FOUND);
    }

    await this.favoritesRepository.delete({
      artistId: id,
    });
  }

  async getAllFavorites(): Promise<FavoritesRepsonse> {
    const favorites = await this.favoritesRepository.find({
      relations: {
        artist: true,
        album: true,
        track: true,
      },
    });

    return favorites.reduce(
      (arr, { artist, album, track }) => {
        if (artist) {
          arr.artists.push(artist);
        }
        if (album) {
          arr.albums.push(album);
        }
        if (track) {
          arr.tracks.push(track);
        }

        return arr;
      },
      {
        artists: [],
        albums: [],
        tracks: [],
      },
    );
  }
}
