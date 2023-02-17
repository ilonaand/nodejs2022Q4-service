import { Artist } from '../../artists/dto/artist.interface';
import { Album } from '../../albums/dto/album.interface';
import { Track } from '../../tracks/dto/track.interface';

export interface Entities {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
