import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtRefreshAutGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    if (!req.body.refreshToken) {
      throw new UnauthorizedException('RefreshToken can not be empty');
    }
    try {
      const user = this.jwtService.verify(req.body.refreshToken);
      req.user = user;
      return true;
    } catch (err) {
      throw new ForbiddenException('RefreshToken no valid');
    }
  }
}
