import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { CreateArtistDto, UpdateArtistDto } from './dto/artist.dto';
import { AlbumsService } from '../albums/albums.service';

import { Artist } from './dto/artist.interface';
import { v4 as uuid, validate } from 'uuid';
import { Album } from 'src/albums/dto/album.interface';

@Injectable()
export class ArtistsService {
  private artists: Array<Artist> = [];
  @Inject(AlbumsService)
  private albumService: AlbumsService;

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

    const albums: Album[] = (await this.albumService.findAll()).filter(
      (album) => album.artistId === id,
    );

    albums.forEach((album) => {
      const { id, ...albumDto } = album;
      const newDto = { ...albumDto, artistId: null };
      this.albumService.updateById(id, newDto);
    });

    return;
  }
}
