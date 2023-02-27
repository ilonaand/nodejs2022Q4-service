import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackEntity } from './entity/tracks.entity';
import { TracksController } from './tracks.controller';
import { TracksService } from './tracks.service';

@Module({
  controllers: [TracksController],
  providers: [TracksService],
  exports: [TypeOrmModule],
  imports: [TypeOrmModule.forFeature([TrackEntity])],
})
export class TracksModule {}
