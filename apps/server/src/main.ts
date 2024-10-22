import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as basicAuth from 'express-basic-auth';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global pipes for validation
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Configuración de Swagger en todos los entornos
  const config = new DocumentBuilder()
    .setTitle('Booked')
    .setDescription('Application for house reservations')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // Condicionar Swagger con autenticación básica solo en producción
  if (process.env.NODE_ENV === 'production') {
    app.use(
      ['/api'],  // Rutas que deseas proteger (Swagger en este caso)
      basicAuth({
        users: { [process.env.SWAGGER_USER]: process.env.SWAGGER_PASSWORD },
        challenge: true,  // Activa el desafío del navegador
      }),
    );
  }

  // Configurar Swagger en la ruta '/api'
  SwaggerModule.setup('api', app, document);

  const PORT = process.env.PORT || 3001;
  await app.listen(PORT);
  Logger.log(`App listening on: http://localhost:${PORT}/api`);
}

bootstrap();

