import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Config, Environment } from './utils/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import pkg from './utils/package-json';
import * as basicAuth from 'express-basic-auth';
import useHttpLogger from './utils/use-http-logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService<Config> = app.get(ConfigService);

  useHttpLogger(app);

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  app.enableCors({ origin: true });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    }),
  );

  if (configService.get('BASIC_AUTH')) {
    const [username, password] = Buffer.from(
      configService.get<string>('BASIC_AUTH'),
      'base64',
    )
      .toString('utf-8')
      .split(':');
    if (!username || !password)
      throw new Error('Cannot parse provided credentials for basic-auth');
    app.use(basicAuth({ users: { [username]: password }, challenge: true }));
    Logger.log('Enabled basic-auth with provided credentials');
  }

  if (configService.get('NODE_ENV') === Environment.Development) {
    const swaggerConfig = new DocumentBuilder()
      .setTitle(pkg.name)
      .setDescription(pkg.description)
      .setContact(pkg.author.name, pkg.author.url, pkg.author.email)
      .setVersion(pkg.version)
      .build();
    const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('/', app, swaggerDocument);
  }

  await app.listen(configService.get('PORT'));
}

bootstrap();
