import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtGuard } from '@v1/modules/auth/guards';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ACGuard, Role, UseRoles } from 'nest-access-control';

export function AuthHttp(...roles: Role[]) {
  return applyDecorators(
    UseGuards(JwtGuard, ACGuard),
    ApiBearerAuth(),
    UseRoles(...roles),
  );
}
