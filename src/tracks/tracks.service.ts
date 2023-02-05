import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateTrackDto, UpdateTrackDto } from './dto/track.dto';

import { Track } from './dto/track.interface';
import { v4 as uuid, validate } from 'uuid';

@Injectable()
export class TracksService {
  private Tracks: Array<Track> = [];

  async create(Track: CreateTrackDto): Promise<Track> {
    const newTrack = {
      ...Track,
      id: uuid(),
    };
    this.Tracks.push(newTrack);
    return newTrack;
  }

  async findAll(): Promise<Track[]> {
    return this.Tracks;
  }

  async findOne(id: string): Promise<Track> {
    if (!validate(id))
      throw new HttpException(
        'TrackId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    const Track = this.Tracks.find((i) => i.id === id);
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
    const Track = this.Tracks.find((i) => i.id === id);

    if (!Track)
      throw new HttpException("Track doesn't exist", HttpStatus.NOT_FOUND);

    this.Tracks = this.Tracks.filter((i) => i !== Track);

    const updatedTrack = {
      ...Track,
      name: updateTrackDto.name,
      duration: updateTrackDto.duration,
      artistId: updateTrackDto.artistId,
      albumId: updateTrackDto.albumId,
    };

    this.Tracks = [...this.Tracks, updatedTrack];

    return updatedTrack;
  }

  async deleteById(id: string) {
    if (!validate(id))
      throw new HttpException(
        'TrackId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );

    const TrackIndex = this.Tracks.findIndex((i) => i.id === id);
    if (TrackIndex < 0)
      throw new HttpException("Track doesn't exist", HttpStatus.NOT_FOUND);

    this.Tracks.splice(TrackIndex, 1);
    return;
  }
}
