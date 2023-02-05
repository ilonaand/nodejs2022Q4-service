import { IsString, IsNotEmpty, IsInt, IsOptional } from 'class-validator';

export class CreateTrackDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsOptional()
  @IsString()
  artistId: string | null;
  @IsOptional()
  @IsString()
  albumId: string | null; // refers to Track
  @IsNotEmpty()
  @IsInt()
  duration: number; // integer number
}

export class UpdateTrackDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsOptional()
  @IsString()
  artistId: string | null;
  @IsOptional()
  @IsString()
  albumId: string | null; // refers to Track
  @IsNotEmpty()
  @IsInt()
  duration: number; // integer number
}
