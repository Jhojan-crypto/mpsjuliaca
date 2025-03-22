// src/modules/auth/authorization.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthorizationService {
  checkPermission(userRole: string, requiredRole: string): boolean {
    // Simples roles jerárquicos: puedes mejorar esto con un sistema más robusto.
    const rolesHierarchy = ['user', 'admin'];
    const userIndex = rolesHierarchy.indexOf(userRole);
    const requiredIndex = rolesHierarchy.indexOf(requiredRole);

    return userIndex >= requiredIndex;
  }
}
