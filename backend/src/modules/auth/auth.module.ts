// src/modules/auth/auth.module.ts
import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfig } from '../../config/jwt.config';
import { AuthenticationController } from '../../common/controllers/authentication.controller';
import { AuthenticationService } from './authentication.service';
import { AuthorizationService } from './authorization.service';
import { AuthorizationController } from '../../common/controllers/authorization.controller';
import { AppConfigModule } from '../../config/config.module'; // Importa AppConfigModule
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    AppConfigModule,
    JwtModule.registerAsync({
      imports: [AppConfigModule], // Haz que JwtModule importe el AppConfigModule
      inject: [JwtConfig], // Inyectamos JwtConfig
      useFactory: (jwtConfig: JwtConfig) => ({
        secret: jwtConfig.getSecret(),
        signOptions: { expiresIn: jwtConfig.getExpiresIn() },
      }),
    }),
    forwardRef(() => UsersModule), // Importa el módulo de usuarios
  ],
  controllers: [AuthenticationController, AuthorizationController],
  providers: [AuthenticationService, JwtConfig, AuthorizationService],
  exports: [JwtModule, AuthorizationService],
})
export class AuthModule {}
