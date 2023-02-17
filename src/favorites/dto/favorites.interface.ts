import { Artist } from '../../artists/dto/artist.interface';
import { Album } from '../../albums/dto/album.interface';
import { Track } from '../../tracks/dto/track.interface';

export interface FavoritesRepsonse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}

export interface Favorites {
  artists: string[];
  albums: string[];
  tracks: string[];
}
