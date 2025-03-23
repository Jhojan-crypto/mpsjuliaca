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

@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    // Obtener el token del encabezado Authorization o de las cookies
    
        // Omitir la validación del token
    console.warn('Advertencia: La validación del token está deshabilitada.');
    //request.user = { userId: 'admin', role: 'admin' }; // Opcional: Agregar un usuario ficticio al request
    return true;
    
    /*const token =
      request.headers.authorization?.split(' ')[1] || request.cookies['auth_token'];

    if (!token) {
      return false; // No hay token
    }

    try {
      const secret = process.env.JWT_SECRET as string; // Asegúrate de que JWT_SECRET esté definido
      const decoded = jwt.verify(token, secret); // Usar JWT_SECRET desde .env
      request.user = decoded;
      return true;
    } catch (err) {
      console.error('Token inválido:', err);
      return false;
    }*/
  }
}
