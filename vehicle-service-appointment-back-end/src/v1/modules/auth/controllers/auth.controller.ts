import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../dto/login.dto';
import { Route } from '@v1/modules/auth/enums';
import { AppRoute, Version } from '@v1/shared/enum';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PublicRoute } from '@v1/shared/decorators';

@ApiTags(AppRoute.auth)
@Controller({
  path: AppRoute.auth,
  version: Version.V1,
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @PublicRoute()
  @Post(Route.login)
  @ApiOperation({
    summary: Route.login,
    description: 'Se está validando que las credenciales concuerden con la db',
  })
  @HttpCode(HttpStatus.CREATED)
  create(@Body() loginDto: LoginDto) {
    return this.authService.create(loginDto);
  }
}
