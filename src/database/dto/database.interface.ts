import { Artist } from 'src/artists/dto/artist.interface';
import { Album } from 'src/albums/dto/album.interface';
import { Track } from 'src/tracks/dto/track.interface';

export interface Entities {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
