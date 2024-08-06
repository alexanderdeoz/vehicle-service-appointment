import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import {
  ClassSerializerInterceptor,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { useContainer } from 'class-validator';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Paths, Version } from '@v1/shared/enum/route';
import path from 'path';

const useCurrentVersion = Version.V1;

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.enableCors();

  app.useStaticAssets({
    root: path.join(process.cwd(), 'public'),
  });

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: 422,
      stopAtFirstError: true,
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  app.setGlobalPrefix(`api`);

  const documentBuilder = new DocumentBuilder()
    .setTitle(`API ${process.env.APP_NAME}`)
    .setDescription('Se describe a continuación rutas disponibles')
    .setVersion(`version ${useCurrentVersion}`)
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, documentBuilder);

  SwaggerModule.setup(Paths.swaggers, app, document);

  await app.listen(process.env.PORT || 5000);
}

bootstrap();
