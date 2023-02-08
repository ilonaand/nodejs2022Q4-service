import { forwardRef, Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { DatabaseModule } from 'src/database/database.module';
import { TracksModule } from 'src/tracks/tracks.module';
import { FavoritesModule } from 'src/favorites/favorites.module';

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
