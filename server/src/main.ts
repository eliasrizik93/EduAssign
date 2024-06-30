import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  dotenv.config();

  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());

  const options = {
    origin: 'http://localhost:3000', // Replace with your frontend origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Enable credentials (cookies)
    preflightContinue: false,
    optionsSuccessStatus: 204,
  };

  app.enableCors(options);

  const port = process.env.PORT || 3002;

  console.log(`Server running on port ${port}`);

  await app.listen(port);
}
bootstrap();
