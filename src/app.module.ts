import { Module } from '@nestjs/common';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { ArtistsService } from './artists/artists.service';
import { ArtistsModule } from './artists/artists.module';
import { ArtistsController } from './artists/artists.controller';
import { AlbumsModule } from './albums/albums.module';
import { TracksModule } from './tracks/tracks.module';
import { FavoritesModule } from './favorites/favorites.module';

@Module({
  imports: [
    UsersModule,
    ArtistsModule,
    AlbumsModule,
    TracksModule,
    FavoritesModule,
  ],
  controllers: [UsersController, ArtistsController],
  providers: [UsersService, ArtistsService],
})
export class AppModule {}
