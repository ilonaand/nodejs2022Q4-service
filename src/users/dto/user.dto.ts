export class User {
  id: string;
  login: string;
  password: string;
  version: number; // integer number, increments on update
  createdAt: number; // timestamp of creation
  updatedAt: number; // timestamp of last update
}

export class CreateUserDto {
  login: string;
  password: string;
}

export class UpdatePasswordDto {
  oldPassword: string; // previous password
  newPassword: string; // new password
}
