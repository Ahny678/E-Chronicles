import * as crypto from 'crypto';
if (typeof globalThis.crypto === 'undefined') {
  (globalThis as any).crypto = crypto;
}
// (globalThis as any).crypto = crypto;

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { altairExpress } from 'altair-express-middleware';
import * as dotenv from 'dotenv';
dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );
  app.enableCors();
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('E-Chronicles API')
    .setDescription('Write and share electronic diary with your penpals!')
    .setVersion('1.0')
    .addTag('diary')
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  app.use(
    '/altair',
    altairExpress({
      endpointURL: '/graphql',
      subscriptionsEndpoint: process.env.GraphqlEndpoint,
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
