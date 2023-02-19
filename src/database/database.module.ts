import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseController } from './database.controller';
import { DatabaseService } from './database.service';

@Module({
  providers: [DatabaseService],
  controllers: [DatabaseController],
  exports: [DatabaseService],
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('TYPEORM_HOST'),
        port: configService.get('POSTGRES_PORT'),
        username: configService.get('TYPEORM_USERNAME'),
        password: configService.get('TYPEORM_PASSWORD'),
        database: configService.get('TYPEORM_DATABASE'),
        migrationsRun: true,
        synchronize: true,
        logging: true,
        logger: 'file',
        entities: [__dirname + '/**/**/*.entity.{ts,js}'],
        migrations: ['src/migrations/*.{ts,js}'],
      }),
    }),
  ],
})
export class DatabaseModule {}
