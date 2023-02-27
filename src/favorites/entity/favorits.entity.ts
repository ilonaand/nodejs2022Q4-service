import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ArtistEntity } from '../../artists/entity/artists.entity';
import { AlbumEntity } from '../../albums/entity/albums.entity';
import { TrackEntity } from '../../tracks/entity/tracks.entity';

@Entity('favorites')
export class FavoritesEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ default: null })
  artistId: string;

  @Column({ default: null })
  albumId: string;

  @Column({ default: null })
  trackId: string;

  @ManyToOne(() => ArtistEntity, (artist) => artist.id, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  artist: ArtistEntity;

  @ManyToOne(() => AlbumEntity, (album) => album.id, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  album: AlbumEntity;

  @ManyToOne(() => TrackEntity, (track) => track.id, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  track: TrackEntity;
}
