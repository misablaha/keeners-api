import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import * as Sentry from '@sentry/node';

async function bootstrap() {
  Sentry.init({ dsn: 'https://62db57ae119448df80034147629d4a0c@o148599.ingest.sentry.io/5194594' });
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: false }));
  await app.listen(configService.get<number>('port', 3001));
}

bootstrap();
