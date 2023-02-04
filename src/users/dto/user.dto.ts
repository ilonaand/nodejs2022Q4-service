import { IsString, IsInt } from 'class-validator';
export class User {
  @IsString()
  id: string;
  @IsString()
  login: string;
  @IsString()
  password: string;
  @IsInt()
  version: number; // integer number, increments on update
  @IsInt()
  createdAt: number; // timestamp of creation
  @IsInt()
  updatedAt: number; // timestamp of last update
}
export class ReceivedUserDto {
  @IsString()
  id: string;
  @IsString()
  login: string;
  @IsInt()
  version: number; // integer number, increments on update
  @IsInt()
  createdAt: number; // timestamp of creation
  @IsInt()
  updatedAt: number; // timestamp of last update
}

export class CreateUserDto {
  @IsString()
  login: string;
  @IsString()
  password: string;
}

export class UpdatePasswordDto {
  @IsString()
  oldPassword: string; // previous password
  @IsString()
  newPassword: string; // new password
}
