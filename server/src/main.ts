import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();

  const app = await NestFactory.create(AppModule);

  const options = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  };

  app.enableCors(options);

  const port = process.env.PORT || 3002;

  console.log(`Server running on port ${port}`);

  await app.listen(port);
}
bootstrap();
