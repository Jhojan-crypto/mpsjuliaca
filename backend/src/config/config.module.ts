// src/config/config.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtConfig } from './jwt.config';

@Module({
  imports: [ConfigModule], // Asegúrate de importar ConfigModule
  providers: [JwtConfig],
  exports: [JwtConfig], // Exportar JwtConfig para que otros módulos lo usen
})
export class AppConfigModule {}
