import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Config, Environment } from './utils/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import pkg from './utils/package-json';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService<Config> = app.get(ConfigService);

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
