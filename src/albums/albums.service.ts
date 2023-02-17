import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { CreateAlbumDto, UpdateAlbumDto } from './dto/album.dto';

import { Album } from './dto/album.interface';
import { v4 as uuid, validate } from 'uuid';
import { TracksService } from '../tracks/tracks.service';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class AlbumsService {
  @Inject()
  private database: DatabaseService;
  @Inject()
  private trackService: TracksService;

  async create(Album: CreateAlbumDto): Promise<Album> {
    const newAlbum = {
      ...Album,
      id: uuid(),
    };
    this.database.entities.albums.push(newAlbum);
    return newAlbum;
  }

  async findAll(): Promise<Album[]> {
    return this.database.entities.albums;
  }

  async findOne(id: string): Promise<Album> {
    if (!validate(id))
      throw new HttpException(
        'AlbumId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    const album = this.database.entities.albums.find((i) => i.id === id);

    if (!album)
      throw new HttpException("Album doesn't exist", HttpStatus.NOT_FOUND);
    return album;
  }

  async updateById(id: string, updateAlbumDto: UpdateAlbumDto): Promise<Album> {
    if (!validate(id))
      throw new HttpException(
        'AlbumId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    const Album = this.database.entities.albums.find((i) => i.id === id);

    if (!Album)
      throw new HttpException("Album doesn't exist", HttpStatus.NOT_FOUND);

    this.database.entities.albums = this.database.entities.albums.filter(
      (i) => i !== Album,
    );

    const updatedAlbum = {
      ...Album,
      name: updateAlbumDto.name,
      year: updateAlbumDto.year,
      artistId: updateAlbumDto.artistId,
    };

    this.database.entities.albums = [
      ...this.database.entities.albums,
      updatedAlbum,
    ];

    return updatedAlbum;
  }

  async deleteById(id: string) {
    if (!validate(id))
      throw new HttpException(
        'AlbumId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );

    const AlbumIndex = this.database.entities.albums.findIndex(
      (i) => i.id === id,
    );
    if (AlbumIndex < 0)
      throw new HttpException("Album doesn't exist", HttpStatus.NOT_FOUND);

    this.database.entities.albums.splice(AlbumIndex, 1);

    const tracks = (await this.trackService.findAll()).filter(
      (track) => track.albumId === id,
    );

    tracks.forEach(async (track) => {
      const { id, ...trackDto } = track;
      const newDto = { ...trackDto, albumId: null };
      await this.trackService.updateById(id, newDto);
    });
    return;
  }
}
