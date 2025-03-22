import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
//import * as moment from 'moment';

@Injectable()
export class JwtConfig {
  constructor(private configService: ConfigService) {}

  getSecret(): string {
    return this.configService.get<string>('JWT_SECRET', 'defaultSecret');
  }

  getExpiresIn(): string {
    return this.configService.get<string>('JWT_EXPIRES_IN', '7m' );
  }
  /*getExpiresIn(): number {
    const expirationDuration = moment.duration(4, 'seconds');
    return expirationDuration.asSeconds(); // Devuelve el tiempo en segundos
  }*/

  getCookieName(): string {
    return this.configService.get<string>('JWT_COOKIE_NAME', 'auth_token');
  }
} 
