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
  // app.enableCors();
  app.enableCors({
    origin: true, // or specify your frontend URL
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'X-Apollo-Operation-Name',
      'Apollo-Require-Preflight',
    ],
    credentials: true,
  });
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
      initialHeaders: {
        'Content-Type': 'application/json', // Required for CSRF bypass
        // Optional: Add if still facing issues
        'Apollo-Require-Preflight': 'true',
      },
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
