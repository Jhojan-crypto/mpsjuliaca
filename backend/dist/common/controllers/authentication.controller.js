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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationController = void 0;
const common_1 = require("@nestjs/common");
const authentication_service_1 = require("../../modules/auth/authentication.service");
const jwt_1 = require("@nestjs/jwt");
const jwt_config_1 = require("../../config/jwt.config");
let AuthenticationController = class AuthenticationController {
    constructor(authenticationService, jwtConfig, jwtService) {
        this.authenticationService = authenticationService;
        this.jwtConfig = jwtConfig;
        this.jwtService = jwtService;
    }
    async login(body, res) {
        const { username, password } = body;
        // Validar usuario con AuthenticationService
        const user = await this.authenticationService.validateUser(username, password);
        if (!user) {
            return res.status(403).send('Acceso denegado: credenciales inválidas. en Fetch/XHR');
        }
        // Generar el token usando AuthenticationService
        const token = this.authenticationService.generateToken(user.id, user.role);
        console.log('Token generado:', token);
        //const token = this.authenticationService.login(user);
        // Guardar el token en una cookie
        res.cookie(this.jwtConfig.getCookieName(), token, {
            httpOnly: true,
            //secure: process.env.NODE_ENV === 'production', // Usar cookies seguras solo en producción
            sameSite: 'strict', // Esto ayuda a proteger contra CSRF
        });
        // Redirigir según el rol del usuario
        /*if (user.role === 'admin') {
          res.redirect('/admin');
        } else if (user.role === 'practicante') {
          res.redirect(`/practicante/${user._id}`);
        } else {
          res.status(403).send('Acceso denegado: rol no autorizado.');
        }*/
        return res.json({ message: 'Inicio de sesión exitoso.', role: user.role, id: user.id, username: user.username });
    }
    async logout(res) {
        // Limpiar la cookie que contiene el token
        res.clearCookie(this.jwtConfig.getCookieName(), {
            httpOnly: true,
            //secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        });
        return res.json({ message: 'Cierre de sesión exitoso.' });
    }
};
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthenticationController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('logout'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthenticationController.prototype, "logout", null);
AuthenticationController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [authentication_service_1.AuthenticationService,
        jwt_config_1.JwtConfig,
        jwt_1.JwtService])
], AuthenticationController);
exports.AuthenticationController = AuthenticationController;
