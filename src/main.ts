import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import router from './routes/index';
import express from 'express';
import cors from 'cors';
console.log('Backend Application Starting...');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors());

  app.use(express.json());

  app.use('/', router);
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
