import { registerAs } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt/dist/interfaces/jwt-module-options.interface';
import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';
import { DataSourceOptions } from 'typeorm';

export const configuration = registerAs('config', () => {
  return {
    TYPEORM: {
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      password: process.env.DB_PASSWORD,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USER,
      type: process.env.DB_TYPE,
      logging: process.env.DB_LOGGING == 'true',
      synchronize: process.env.DB_SYNCHRONIZE == 'true',
      dropSchema: process.env.DB_DROP_SCHEMA == 'true',
    } as TypeOrmModuleOptions,
    DATABASE: {
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      password: process.env.DB_PASSWORD,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USER,
      type: process.env.DB_TYPE,
      logging: process.env.DB_LOGGING == 'true',
      synchronize: process.env.DB_SYNCHRONIZE == 'true',
      dropSchema: process.env.DB_DROP_SCHEMA == 'true',
    } as DataSourceOptions,
    jwt: {
      global: process.env.JWT_GLOBAL == 'true',
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: parseInt(process.env.JWT_EXPIRES_IN),
        algorithm: process.env.JWT_ALGORITHM,
      },
    } as JwtModuleOptions,
    app: {
      apiEnv: process.env.APP_ENV,
      apiKey: process.env.API_KEY,
      port: parseInt(process.env.PORT, 10),
      encryptKey: process.env.ENCRYPT_KEY,
    },
    superUser: {
      super_user_email: process.env.SUPER_USER_EMAIL,
      super_user_password: process.env.SUPER_USER_PASSWORD,
    },
  };
});
