import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateArtistDto, UpdateArtistDto } from './dto/artist.dto';

import { Artist } from './dto/artist.interface';
import { v4 as uuid, validate } from 'uuid';

@Injectable()
export class ArtistsService {
  private artists: Array<Artist> = [];

  async create(artist: CreateArtistDto): Promise<Artist> {
    const newArtist = {
      ...artist,
      id: uuid(),
    };
    this.artists.push(newArtist);
    return newArtist;
  }

  async findAll(): Promise<Artist[]> {
    return this.artists;
  }

  async findOne(id: string): Promise<Artist> {
    if (!validate(id))
      throw new HttpException(
        'artistId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    const artist = this.artists.find((i) => i.id === id);
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
    const artist = this.artists.find((i) => i.id === id);

    if (!artist)
      throw new HttpException("artist doesn't exist", HttpStatus.NOT_FOUND);

    this.artists = this.artists.filter((i) => i !== artist);

    const updatedArtist = {
      ...artist,
      name: updateArtistDto.name,
      grammy: updateArtistDto.grammy,
    };

    return updatedArtist;
  }

  async deleteById(id: string) {
    if (!validate(id))
      throw new HttpException(
        'artistId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );

    const artistIndex = this.artists.findIndex((i) => i.id === id);
    if (artistIndex < 0)
      throw new HttpException("artist doesn't exist", HttpStatus.NOT_FOUND);

    this.artists.splice(artistIndex, 1);
    return;
  }
}
