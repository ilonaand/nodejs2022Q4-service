import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { ArtistsService } from './artists/artists.service';
import { ArtistsModule } from './artists/artists.module';
import { ArtistsController } from './artists/artists.controller';
import { AlbumsController } from './albums/albums.controller';
import { AlbumsModule } from './albums/albums.module';
import { AlbumsService } from './albums/albums.service';

@Module({
  imports: [UsersModule, ArtistsModule, AlbumsModule],
  controllers: [
    AppController,
    UsersController,
    AlbumsController,
    ArtistsController,
  ],
  providers: [AppService, UsersService, ArtistsService, AlbumsService],
})
export class AppModule {}
