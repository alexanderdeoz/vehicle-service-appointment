import { Global, Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from '@v1/modules/auth/controllers';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { configuration } from '@v1/shared/config';
import { ConfigType } from '@nestjs/config';
import { JwtModuleAsyncOptions } from '@nestjs/jwt/dist/interfaces/jwt-module-options.interface';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from '@v1/modules/auth/guards';

@Global()
@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [configuration.KEY],
      useFactory: (
        configService: ConfigType<typeof configuration>,
      ): JwtModuleOptions | Promise<JwtModuleOptions> => {
        return configService.jwt;
      },
    } as JwtModuleAsyncOptions),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
