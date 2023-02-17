import { forwardRef, Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { DatabaseModule } from '../database/database.module';
import { TracksModule } from '../tracks/tracks.module';
import { FavoritesModule } from '../favorites/favorites.module';

@Module({
  providers: [AlbumsService],
  controllers: [AlbumsController],
  exports: [AlbumsService],
  imports: [
    forwardRef(() => DatabaseModule),
    forwardRef(() => TracksModule),
    forwardRef(() => FavoritesModule),
  ],
})
export class AlbumsModule {}
