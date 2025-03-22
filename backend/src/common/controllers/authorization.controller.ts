// src/modules/auth/authorization.controller.ts
import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { AuthorizationService } from '../../modules/auth/authorization.service';

@Controller('authorization')
export class AuthorizationController {
  constructor(private readonly authorizationService: AuthorizationService) {}

  @Get('check')
  checkPermission(
    @Query('userRole') userRole: string,
    @Query('requiredRole') requiredRole: string,
  ) {
    if (!userRole || !requiredRole) {
      throw new BadRequestException('Missing userRole or requiredRole');
    }
    const hasPermission = this.authorizationService.checkPermission(
      userRole,
      requiredRole,
    );
    return { hasPermission };
  }
}
