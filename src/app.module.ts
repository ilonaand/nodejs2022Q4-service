import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { ArtistsService } from './artists/artists.service';
import { ArtistsModule } from './artists/artists.module';

@Module({
  imports: [UsersModule, ArtistsModule],
  controllers: [AppController, UsersController],
  providers: [AppService, UsersService, ArtistsService],
})
export class AppModule {}
