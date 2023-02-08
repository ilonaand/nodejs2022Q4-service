import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { CreateTrackDto, UpdateTrackDto } from './dto/track.dto';

import { Track } from './dto/track.interface';
import { v4 as uuid, validate } from 'uuid';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class TracksService {
  @Inject()
  public database: DatabaseService;

  async create(Track: CreateTrackDto): Promise<Track> {
    const newTrack = {
      ...Track,
      id: uuid(),
    };
    this.database.entities.tracks.push(newTrack);
    return newTrack;
  }

  async findAll(): Promise<Track[]> {
    return this.database.entities.tracks;
  }

  async findOne(id: string): Promise<Track> {
    if (!validate(id))
      throw new HttpException(
        'TrackId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    const Track = this.database.entities.tracks.find((i) => i.id === id);
    if (!Track)
      throw new HttpException("Track doesn't exist", HttpStatus.NOT_FOUND);
    return Track;
  }

  async updateById(id: string, updateTrackDto: UpdateTrackDto): Promise<Track> {
    if (!validate(id))
      throw new HttpException(
        'TrackId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    const Track = this.database.entities.tracks.find((i) => i.id === id);

    if (!Track)
      throw new HttpException("Track doesn't exist", HttpStatus.NOT_FOUND);

    this.database.entities.tracks = this.database.entities.tracks.filter(
      (i) => i !== Track,
    );

    const updatedTrack = {
      ...Track,
      name: updateTrackDto.name,
      duration: updateTrackDto.duration,
      artistId: updateTrackDto.artistId,
      albumId: updateTrackDto.albumId,
    };

    this.database.entities.tracks = [
      ...this.database.entities.tracks,
      updatedTrack,
    ];

    return updatedTrack;
  }

  async deleteById(id: string) {
    if (!validate(id))
      throw new HttpException(
        'TrackId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );

    const TrackIndex = this.database.entities.tracks.findIndex(
      (i) => i.id === id,
    );
    if (TrackIndex < 0)
      throw new HttpException("Track doesn't exist", HttpStatus.NOT_FOUND);

    this.database.entities.tracks.splice(TrackIndex, 1);
    return;
  }
}
