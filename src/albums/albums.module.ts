import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumEntity } from './entity/albums.entity';

@Module({
  providers: [AlbumsService],
  controllers: [AlbumsController],
  exports: [TypeOrmModule],
  imports: [TypeOrmModule.forFeature([AlbumEntity])],
})
export class AlbumsModule {}
