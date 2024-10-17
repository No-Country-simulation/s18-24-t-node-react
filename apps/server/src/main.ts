import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  
  const PORT = process.env.PORT || 3001;

  await app.listen(PORT);

  Logger.log(`App listen in: http://localhost:${PORT}`);
}
bootstrap();
