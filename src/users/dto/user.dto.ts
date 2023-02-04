import { IsString } from 'class-validator';

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
