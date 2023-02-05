import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateAlbumDto, UpdateAlbumDto } from './dto/album.dto';

import { Album } from './dto/album.interface';
import { v4 as uuid, validate } from 'uuid';

@Injectable()
export class AlbumsService {
  private Albums: Array<Album> = [];

  async create(Album: CreateAlbumDto): Promise<Album> {
    const newAlbum = {
      ...Album,
      id: uuid(),
    };
    this.Albums.push(newAlbum);
    return newAlbum;
  }

  async findAll(): Promise<Album[]> {
    return this.Albums;
  }

  async findOne(id: string): Promise<Album> {
    if (!validate(id))
      throw new HttpException(
        'AlbumId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    const Album = this.Albums.find((i) => i.id === id);
    if (!Album)
      throw new HttpException("Album doesn't exist", HttpStatus.NOT_FOUND);
    return Album;
  }

  async updateById(id: string, updateAlbumDto: UpdateAlbumDto): Promise<Album> {
    if (!validate(id))
      throw new HttpException(
        'AlbumId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    const Album = this.Albums.find((i) => i.id === id);

    if (!Album)
      throw new HttpException("Album doesn't exist", HttpStatus.NOT_FOUND);

    this.Albums = this.Albums.filter((i) => i !== Album);

    const updatedAlbum = {
      ...Album,
      name: updateAlbumDto.name,
      year: updateAlbumDto.year,
      artistId: updateAlbumDto.artistId,
    };

    return updatedAlbum;
  }

  async deleteById(id: string) {
    if (!validate(id))
      throw new HttpException(
        'AlbumId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );

    const AlbumIndex = this.Albums.findIndex((i) => i.id === id);
    if (AlbumIndex < 0)
      throw new HttpException("Album doesn't exist", HttpStatus.NOT_FOUND);

    this.Albums.splice(AlbumIndex, 1);
    return;
  }
}
