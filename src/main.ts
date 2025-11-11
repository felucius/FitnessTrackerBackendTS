import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import router from './routes/index';
import express from 'express';

console.log('Backend Application Starting...');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(express.json());

  app.use('/', router);
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
