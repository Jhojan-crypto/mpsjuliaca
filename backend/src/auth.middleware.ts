import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtConfig } from './config/jwt.config';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly jwtConfig: JwtConfig,
  ) {}

  use(req: Request, res: Response, next: NextFunction) {
    const tokenName = this.jwtConfig.getCookieName();
    const token = req.cookies[tokenName]; // Extraer el token de las cookies
    console.log('Token recibido:', token);

    if (!token) {
      console.error('Token no encontrado en las cookies');
      throw new UnauthorizedException('Token de autenticación no encontrado.');
    }

    try {
      // Decodificar el token
      const decoded = this.jwtService.verify(token, {
        secret: this.jwtConfig.getSecret(),
      });
      console.log('Token decodificado:', decoded);

      // Verificar cuánto tiempo queda para que expire el token
      const now = Math.floor(Date.now() / 1000); // Tiempo actual en segundos
      const expTime = decoded.exp; // Tiempo de expiración del token en segundos

      if (expTime - now < 5 * 60) {
        // Si el token expira en menos de 5 minutos, renovar
        console.log('El token está por expirar, renovando...');

        const newToken = this.jwtService.sign(
          { userId: decoded.userId, role: decoded.role }, // Payload original
          {
            secret: this.jwtConfig.getSecret(),
            expiresIn: this.jwtConfig.getExpiresIn(), // Duración original
          },
        );
        // Actualizar la cookie con el nuevo token
        res.cookie(tokenName, newToken, {
          httpOnly: true,
          //secure: process.env.NODE_ENV === 'production',
        });
        console.log('Token renovado y enviado en la cookie.');
      }

      console.log('Token decodificado:', decoded);
      req.user = decoded; // Agregar datos decodificados al objeto `req`
      console.log('Información del usuario añadida al request:', req.user);
      next(); // Continuar al siguiente middleware o controlador
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error al validar token:', error.message);
        throw new UnauthorizedException('Token inválido o expirado.');
      }
      // Si no es una instancia de Error, lanzamos el error original
      throw error;
    }
  }
}
/*
import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      // Si no existe el encabezado Authorization
      console.log('No authorization header provided');
      req.user = null;
    } else {
      // Extraer el token y realizar lógica de validación
      const authToken = authHeader.split(' ')[1];
      if (!authToken) {
        console.log('Authorization token is missing');
        req.user = null;
      } else {
        // Aquí puedes añadir lógica para validar el token si es necesario
        req.auth_token = authToken; // Guardar el token en el request
        console.log('Token processed:', authToken);
      }
    }
    next();
  }
}
*/

/*
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const excludedRoutes = ['/auth/login', '/auth/register']; // Excluir rutas públicas
    if (excludedRoutes.includes(req.path)) {
      return next();
    }

    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res.status(401).json({
        statusCode: 401,
        message: 'Token de autenticación no encontrado.',
        error: 'Unauthorized',
      });
    }

    // Validar el token JWT
    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({
        statusCode: 401,
        message: 'Token no proporcionado.',
        error: 'Unauthorized',
      });
    }

    // Continuar si todo está bien
    next();
  }
}*/