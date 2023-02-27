import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAlbumDto, UpdateAlbumDto } from './dto/album.dto';
import { AlbumEntity } from './entity/albums.entity';

import { Album } from './dto/album.interface';
import { validate } from 'uuid';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(AlbumEntity)
    private readonly albumRepository: Repository<AlbumEntity>,
  ) {}

  async create(Album: CreateAlbumDto): Promise<AlbumEntity> {
    const newAlbum = new AlbumEntity();
    Object.assign(newAlbum, Album);
    return this.albumRepository.save(newAlbum);
  }

  async findAll(): Promise<Album[]> {
    return this.albumRepository.find();
  }

  async findOne(id: string): Promise<AlbumEntity> {
    if (!validate(id))
      throw new HttpException(
        'AlbumId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    const album = await this.albumRepository.findOneBy({ id });

    if (!album)
      throw new HttpException("Album doesn't exist", HttpStatus.NOT_FOUND);
    return album;
  }

  async updateById(
    id: string,
    updateAlbumDto: UpdateAlbumDto,
  ): Promise<AlbumEntity> {
    if (!validate(id))
      throw new HttpException(
        'AlbumId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    const Album = await this.findOne(id);

    if (!Album)
      throw new HttpException("Album doesn't exist", HttpStatus.NOT_FOUND);

    Object.assign(Album, updateAlbumDto);

    return this.albumRepository.save(Album);
  }

  async deleteById(id: string) {
    if (!validate(id))
      throw new HttpException(
        'AlbumId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );

    const album = await this.findOne(id);

    await this.albumRepository.delete(album.id);
  }
}
