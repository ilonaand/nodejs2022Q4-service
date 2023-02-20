import { forwardRef, Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { FavoritesModule } from '../favorites/favorites.module';
import { TracksController } from './tracks.controller';
import { TracksService } from './tracks.service';

@Module({
  controllers: [TracksController],
  providers: [TracksService],
  exports: [TracksService],
  imports: [
    forwardRef(() => DatabaseModule),
    forwardRef(() => FavoritesModule),
  ],
})
export class TracksModule {}
