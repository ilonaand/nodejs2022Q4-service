import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { CreateArtistDto, UpdateArtistDto } from './dto/artist.dto';

import { Artist } from './dto/artist.interface';
import { v4 as uuid, validate } from 'uuid';
import { Album } from 'src/albums/dto/album.interface';
import { Track } from 'src/tracks/dto/track.interface';
import { DatabaseService } from 'src/database/database.service';
import { AlbumsService } from 'src/albums/albums.service';
import { TracksService } from 'src/tracks/tracks.service';

@Injectable()
export class ArtistsService {
  @Inject()
  private database: DatabaseService;
  @Inject()
  private tracksService: TracksService;
  @Inject()
  private albumsService: AlbumsService;

  async create(artist: CreateArtistDto): Promise<Artist> {
    const newArtist = {
      ...artist,
      id: uuid(),
    };
    this.database.entities.artists.push(newArtist);
    return newArtist;
  }

  async findAll(): Promise<Artist[]> {
    return this.database.entities.artists;
  }

  async findOne(id: string): Promise<Artist> {
    if (!validate(id))
      throw new HttpException(
        'artistId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    const artist = this.database.entities.artists.find((i) => i.id === id);
    if (!artist)
      throw new HttpException("artist doesn't exist", HttpStatus.NOT_FOUND);
    return artist;
  }

  async updateById(
    id: string,
    updateArtistDto: UpdateArtistDto,
  ): Promise<Artist> {
    if (!validate(id))
      throw new HttpException(
        'artistId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    const artist = this.database.entities.artists.find((i) => i.id === id);

    if (!artist)
      throw new HttpException("artist doesn't exist", HttpStatus.NOT_FOUND);

    this.database.entities.artists = this.database.entities.artists.filter(
      (i) => i !== artist,
    );

    const updatedArtist = {
      ...artist,
      name: updateArtistDto.name,
      grammy: updateArtistDto.grammy,
    };

    this.database.entities.artists = [
      ...this.database.entities.artists,
      updatedArtist,
    ];

    return updatedArtist;
  }

  async deleteById(id: string) {
    if (!validate(id))
      throw new HttpException(
        'artistId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );

    const artistIndex = this.database.entities.artists.findIndex(
      (i) => i.id === id,
    );
    if (artistIndex < 0)
      throw new HttpException("artist doesn't exist", HttpStatus.NOT_FOUND);

    this.database.entities.artists.splice(artistIndex, 1);

    const tracks: Track[] = (await this.tracksService.findAll()).filter(
      (track) => track.artistId === id,
    );

    tracks.forEach(async (track) => {
      const { id, ...trackDto } = track;
      const newDto = { ...trackDto, artistId: null };
      await this.tracksService.updateById(id, newDto);
    });

    const albums: Album[] = (await this.albumsService.findAll()).filter(
      (album) => album.artistId === id,
    );

    albums.forEach(async (album) => {
      const { id, ...albumDto } = album;
      const newDto = { ...albumDto, artistId: null };
      await this.albumsService.updateById(id, newDto);
    });

    return;
  }
}
