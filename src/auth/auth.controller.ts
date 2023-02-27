import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/user.dto';
import { Public } from './public.decorator';
import { JwtRefreshAutGuard } from './jwt-refresh.guard';
import { RefreshDto } from './dto/refresh.token';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('/login')
  login(@Body() userDto: CreateUserDto) {
    return this.authService.login(userDto);
  }

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post('/signup')
  registration(@Body() userDto: CreateUserDto) {
    return this.authService.signUp(userDto);
  }

  @Public()
  @UseGuards(JwtRefreshAutGuard)
  @HttpCode(HttpStatus.OK)
  @Post('/refresh')
  refresh(@Body() refreshToken: RefreshDto) {
    return this.authService.refresh(refreshToken);
  }
}
