import { Injectable } from '@nestjs/common';
import { Entities } from './dto/database.interface';

@Injectable()
export class DatabaseService {
  public entities: Entities = {
    artists: [],
    albums: [],
    tracks: [],
  };
}
