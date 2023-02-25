import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateTrackDto, UpdateTrackDto } from './dto/track.dto';
import { TrackEntity } from './entity/tracks.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { validate } from 'uuid';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(TrackEntity)
    private readonly trackRepository: Repository<TrackEntity>,
  ) {}

  async create(Track: CreateTrackDto): Promise<TrackEntity> {
    const newTrack = new TrackEntity();
    Object.assign(newTrack, Track);

    return this.trackRepository.save(newTrack);
  }

  async findAll(): Promise<TrackEntity[]> {
    return await this.trackRepository.find();
  }

  async findOne(id: string): Promise<TrackEntity> {
    if (!validate(id))
      throw new HttpException(
        'TrackId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    const Track = await this.trackRepository.findOneBy({ id });
    if (!Track)
      throw new HttpException("Track doesn't exist", HttpStatus.NOT_FOUND);
    return Track;
  }

  async updateById(
    id: string,
    updateTrackDto: UpdateTrackDto,
  ): Promise<TrackEntity> {
    if (!validate(id))
      throw new HttpException(
        'TrackId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    const Track = await this.findOne(id);

    if (!Track)
      throw new HttpException("Track doesn't exist", HttpStatus.NOT_FOUND);

    Object.assign(Track, updateTrackDto);
    return Track;
  }

  async deleteById(id: string) {
    if (!validate(id))
      throw new HttpException(
        'TrackId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );

    const track = await this.findOne(id);

    this.trackRepository.delete(track.id);
  }
}
