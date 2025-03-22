import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Obtener los roles requeridos del decorador @Roles
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!requiredRoles) {
      return true; // Si no hay roles especificados, permitir acceso.
    }

    // Obtener la información del usuario desde la solicitud
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      return false; // Si no hay usuario, denegar acceso.
    }

    // Validar si el usuario tiene alguno de los roles requeridos
    return requiredRoles.some(role => role === user.role);
  }
}
