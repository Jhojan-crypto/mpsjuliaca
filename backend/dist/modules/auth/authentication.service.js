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
exports.AuthenticationService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const user_schema_1 = require("../users/user.schema");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const jwt_config_1 = require("../../config/jwt.config");
let AuthenticationService = class AuthenticationService {
    constructor(jwtService, jwtConfig, userModel) {
        this.jwtService = jwtService;
        this.jwtConfig = jwtConfig;
        this.userModel = userModel;
    }
    /*async validateUser(username: string, password: string): Promise<User | null> {
      //Buscar al usuario en la base de datos
      const user = await this.userModel.findOne({ username }).exec(); // No compares directamente en Mongo
      //Validar la contraseña utilizando bcrypt
      if (user && (await bcrypt.compare(password, user.password))) {
        return user;
      }*/
    async validateUser(username, password) {
        //console.log('Buscando usuario con username:', username);
        const user = await this.userModel.findOne({ username }).exec();
        if (!user) {
            console.log('Usuario no encontrado en la terminal');
            return null;
        }
        // TODO: Implementar hash de contraseña
        if (user.password === password) {
            console.log('Usuario validado:', user);
            return user;
        }
        console.log('Contraseña incorrecta');
        return null;
    }
    // Método para generar el token
    generateToken(userId, role) {
        return this.jwtService.sign({ userId, role }, {
            secret: this.jwtConfig.getSecret(),
            expiresIn: this.jwtConfig.getExpiresIn(), // Usamos la configuración de expiración
        });
    }
    async login(user) {
        const payload = { userId: user.id, role: user.role };
        return this.jwtService.sign(payload, {
            secret: this.jwtConfig.getSecret(),
            expiresIn: this.jwtConfig.getExpiresIn(),
        });
    }
};
AuthenticationService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, mongoose_2.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        jwt_config_1.JwtConfig,
        mongoose_1.Model])
], AuthenticationService);
exports.AuthenticationService = AuthenticationService;
