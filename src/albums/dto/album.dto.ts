import { IsString, IsNotEmpty, IsInt, IsOptional } from 'class-validator';

export class CreateAlbumDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsInt()
  @IsNotEmpty()
  year: number;
  @IsOptional()
  @IsString()
  artistId: string | null;
}

export class UpdateAlbumDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsInt()
  @IsNotEmpty()
  year: number;
  @IsOptional()
  @IsString()
  artistId: string | null;
}
