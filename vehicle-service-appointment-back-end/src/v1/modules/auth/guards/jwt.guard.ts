import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { configuration } from '@v1/shared/config';
import { MetadataKey } from '@v1/shared/enum';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
    @Inject(configuration.KEY)
    private readonly configService: ConfigType<typeof configuration>,
  ) {}

  public async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.get(
      MetadataKey.IS_PUBLIC_ROUTE_KEY,
      context.getHandler(),
    );
    if (isPublic) return true;

    const req = context.switchToHttp().getRequest();
    const token: string = this.extractTokenFromHeader(req);
    if (!token) throw new UnauthorizedException();

    try {
      req['user'] = await this.jwtService.verifyAsync(token, {
        ignoreExpiration: false,
        secret: this.configService.jwtSecret,
      });
    } catch (e) {
      throw new UnauthorizedException(e);
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
