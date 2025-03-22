"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizationService = void 0;
// src/modules/auth/authorization.service.ts
const common_1 = require("@nestjs/common");
let AuthorizationService = class AuthorizationService {
    checkPermission(userRole, requiredRole) {
        // Simples roles jerárquicos: puedes mejorar esto con un sistema más robusto.
        const rolesHierarchy = ['user', 'admin'];
        const userIndex = rolesHierarchy.indexOf(userRole);
        const requiredIndex = rolesHierarchy.indexOf(requiredRole);
        return userIndex >= requiredIndex;
    }
};
AuthorizationService = __decorate([
    (0, common_1.Injectable)()
], AuthorizationService);
exports.AuthorizationService = AuthorizationService;
