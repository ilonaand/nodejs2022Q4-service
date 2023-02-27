import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateArtistDto, UpdateArtistDto } from './dto/artist.dto';

import { validate } from 'uuid';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ArtistEntity } from './entity/artists.entity';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(ArtistEntity)
    private readonly artistRepository: Repository<ArtistEntity>,
  ) {}

  async create(artist: CreateArtistDto): Promise<ArtistEntity> {
    const newArtist = new ArtistEntity();
    Object.assign(newArtist, artist);
    return this.artistRepository.save(newArtist);
  }

  async findAll(): Promise<ArtistEntity[]> {
    return this.artistRepository.find();
  }

  async findOne(id: string): Promise<ArtistEntity> {
    if (!validate(id))
      throw new HttpException(
        'artistId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    const artist = await this.artistRepository.findOneBy({ id });
    if (!artist)
      throw new HttpException("artist doesn't exist", HttpStatus.NOT_FOUND);
    return artist;
  }

  async updateById(
    id: string,
    updateArtistDto: UpdateArtistDto,
  ): Promise<ArtistEntity> {
    if (!validate(id))
      throw new HttpException(
        'artistId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    const artist = await this.findOne(id);

    if (!artist)
      throw new HttpException("artist doesn't exist", HttpStatus.NOT_FOUND);

    Object.assign(artist, updateArtistDto);
    return await this.artistRepository.save(artist);
  }

  async deleteById(id: string) {
    if (!validate(id))
      throw new HttpException(
        'artistId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    const artist = await this.findOne(id);

    await this.artistRepository.delete(artist.id);
  }
}
