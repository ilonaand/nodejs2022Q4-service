import { forwardRef, Module } from '@nestjs/common';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';

import { DatabaseModule } from '../database/database.module';
import { AlbumsModule } from '../albums/albums.module';
import { TracksModule } from '../tracks/tracks.module';
import { ArtistsModule } from '../artists/artists.module';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService],
  exports: [FavoritesService],
  imports: [
    forwardRef(() => DatabaseModule),
    forwardRef(() => AlbumsModule),
    forwardRef(() => TracksModule),
    forwardRef(() => ArtistsModule),
  ],
})
export class FavoritesModule {}
