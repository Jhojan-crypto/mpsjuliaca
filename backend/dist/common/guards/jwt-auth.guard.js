"use strict";
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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt = __importStar(require("jsonwebtoken"));
let JwtAuthGuard = class JwtAuthGuard {
    canActivate(context) {
        var _a;
        const request = context.switchToHttp().getRequest();
        // Obtener el token del encabezado Authorization o de las cookies
        const token = ((_a = request.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1]) || request.cookies['auth_token'];
        if (!token) {
            return false; // No hay token
        }
        try {
            const secret = process.env.JWT_SECRET; // Asegúrate de que JWT_SECRET esté definido
            const decoded = jwt.verify(token, secret); // Usar JWT_SECRET desde .env
            request.user = decoded;
            return true;
        }
        catch (err) {
            console.error('Token inválido:', err);
            return false;
        }
    }
};
JwtAuthGuard = __decorate([
    (0, common_1.Injectable)()
], JwtAuthGuard);
exports.JwtAuthGuard = JwtAuthGuard;
