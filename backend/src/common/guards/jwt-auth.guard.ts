/*import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];
    const token = request.cookies['auth_token'];
    
    if (!token) {
      return false; // No hay token
    }

    try {
      // Verificar token y adjuntar usuario al request
      const decoded = jwt.verify(token, 'tu_secreto');
      request.user = decoded;
      return true;
    } catch (err) {
      console.error('Token inválido:', err);
      return false; // Token inválido
    }
  }
}
*/

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { JwtConfig } from '../../config/jwt.config';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtConfig: JwtConfig) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      console.error('Token no encontrado');
      return false;
    }

    try {
      const secret = this.jwtConfig.getSecret(); // Obtén la clave secreta desde JwtConfig
      const decoded = jwt.verify(token, secret); // Verifica el token con la clave secreta
      request.user = decoded; // Adjunta el usuario decodificado al request
      return true;
    } catch (err) {
      console.error('Token inválido:', err.message);
      return false;
    }
  }
}