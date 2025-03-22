"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
// src/modules/auth/auth.module.ts
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const jwt_config_1 = require("../../config/jwt.config");
const authentication_controller_1 = require("../../common/controllers/authentication.controller");
const authentication_service_1 = require("./authentication.service");
const authorization_service_1 = require("./authorization.service");
const authorization_controller_1 = require("../../common/controllers/authorization.controller");
const config_module_1 = require("../../config/config.module"); // Importa AppConfigModule
const users_module_1 = require("../users/users.module");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_module_1.AppConfigModule,
            jwt_1.JwtModule.registerAsync({
                imports: [config_module_1.AppConfigModule],
                inject: [jwt_config_1.JwtConfig],
                useFactory: (jwtConfig) => ({
                    secret: jwtConfig.getSecret(),
                    signOptions: { expiresIn: jwtConfig.getExpiresIn() },
                }),
            }),
            (0, common_1.forwardRef)(() => users_module_1.UsersModule), // Importa el módulo de usuarios
        ],
        controllers: [authentication_controller_1.AuthenticationController, authorization_controller_1.AuthorizationController],
        providers: [authentication_service_1.AuthenticationService, jwt_config_1.JwtConfig, authorization_service_1.AuthorizationService],
        exports: [jwt_1.JwtModule, authorization_service_1.AuthorizationService],
    })
], AuthModule);
exports.AuthModule = AuthModule;
