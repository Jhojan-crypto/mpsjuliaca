"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtConfig = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
//import * as moment from 'moment';
let JwtConfig = class JwtConfig {
    constructor(configService) {
        this.configService = configService;
    }
    getSecret() {
        return this.configService.get('JWT_SECRET', 'defaultSecret');
    }
    getExpiresIn() {
        return this.configService.get('JWT_EXPIRES_IN', '7m');
    }
    /*getExpiresIn(): number {
      const expirationDuration = moment.duration(4, 'seconds');
      return expirationDuration.asSeconds(); // Devuelve el tiempo en segundos
    }*/
    getCookieName() {
        return this.configService.get('JWT_COOKIE_NAME', 'auth_token');
    }
};
JwtConfig = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], JwtConfig);
exports.JwtConfig = JwtConfig;
