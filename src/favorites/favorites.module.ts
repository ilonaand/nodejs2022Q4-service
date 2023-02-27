import { Module } from '@nestjs/common';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';
import { AlbumsModule } from '../albums/albums.module';
import { ArtistsModule } from '../artists/artists.module';
import { TracksModule } from '../tracks/tracks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoritesEntity } from './entity/favorits.entity';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService],
  exports: [TypeOrmModule],
  imports: [
    TypeOrmModule.forFeature([FavoritesEntity]),
    TracksModule,
    AlbumsModule,
    ArtistsModule,
  ],
})
export class FavoritesModule {}
