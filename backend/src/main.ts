/*import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:4200', // URL del frontend
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  }); // Permitir CORS para conectar el frontend
  
  await app.listen(3000);
  console.log('Backend ejecutándose en http://localhost:3000');
}
bootstrap();
*/

import { NestFactory } from '@nestjs/core'; 
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

dotenv.config(); // Cargar las variables del archivo .env

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser()); // Habilitar cookies
  
  app.enableCors({
    origin: 'http://localhost:3000', 
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  }); // Permitir CORS para conectar el frontend

  const port = process.env.PORT || 8080; 
  await app.listen(port); // Usa la variable de entorno PORT, si está definida
  console.log(`Backend ejecutándose en http://localhost:${port}`);
}
bootstrap();
