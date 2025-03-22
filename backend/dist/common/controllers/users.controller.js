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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../guards/jwt-auth.guard");
const users_service_1 = require("../../modules/users/users.service");
const authorization_service_1 = require("../../modules/auth/authorization.service");
//import { UnauthorizedException } from '@nestjs/common';
const create_user_dto_1 = require("../../dto/create-user.dto"); // Import the DTO
const create_task_dto_1 = require("../../dto/create-task.dto"); // Add this import
let UsersController = class UsersController {
    constructor(usersService, authorizationService) {
        this.usersService = usersService;
        this.authorizationService = authorizationService;
    }
    // --------------------- Funciones compartidas ---------------------
    ping() {
        return { message: 'Pong!' };
    }
    // Perfil del usuario autenticado
    async getUserProfile(req) {
        if (!req.user) {
            throw new common_1.UnauthorizedException('Usuario no autenticado.');
        }
        // Obtener el userId desde el token JWT decodificado
        const userId = req.user.userId;
        // Consulta en la base de datos
        const user = await this.usersService.getUserById(userId);
        if (!user) {
            throw new common_1.UnauthorizedException('Usuario no encontrado.');
        }
        return user; // Retorna el usuario al cliente
    }
    async getPracticantes() {
        // Obtener los usuarios con el rol de 'practicante' desde el servicio
        const practicantes = await this.usersService.getUsersByRole('practicante');
        return practicantes;
    }
    async getAdministrative() {
        // Obtener los usuarios con el rol de 'practicante' desde el servicio
        const administrativos = await this.usersService.getUsersByRole('administrative');
        return administrativos;
    }
    /*
    @Get(':id')
    async getUser(@Param('id') id: string, @Param('role') role: string) {
      const user = await this.usersService.getUserById(id);
      if (!this.authorizationService.checkPermission(role, 'admin')) {
        throw new ForbiddenException('Insufficient permissions');
      }
      return user;
    }*/
    // --------------------- Funciones exclusivas de Admin ---------------------
    // Crear un nuevo usuario (solo admins)
    //@UseGuards(RolesGuard) // Validación adicional para roles
    //@Roles('admin') // Solo admins pueden acceder
    //createUser(@Body() createUserDto: CreateUserDto) { // Use the DTO
    async createUser(createUserDto, res) {
        try {
            const user = await this.usersService.create(createUserDto);
            return res.status(common_1.HttpStatus.CREATED).json(user);
        }
        catch (error) {
            console.error('Error creating user:', error);
            return res.status(403).send('Acceso denegado: no se pudo insertar en la base de datos');
        }
    }
    // Crear una nueva tarea (solo admins)
    //@UseGuards(RolesGuard) // Validación adicional para roles
    //@Roles('admin') // Solo admins pueden acceder
    createTask(createTaskDto) {
        return this.usersService.createTask(createTaskDto);
    }
    getUserTasks(req) {
        if (!req.user) {
            throw new common_1.UnauthorizedException('Usuario no autenticado.');
        }
        return this.usersService.getTasksByUser(req.user.userId);
    }
    async getTasksByUser(id) {
        const tasks = await this.usersService.getTasksByUser(id);
        if (!tasks) {
            throw new common_1.NotFoundException('Tareas no encontradas.');
        }
        return tasks;
    }
    async obtenerDetails(id) {
        const user = await this.usersService.getUserById(id);
        if (!user) {
            throw new common_1.NotFoundException('Usuario no encontrado.');
        }
        return user;
    }
    async getUserById(id) {
        return this.usersService.getUserById(id);
    }
};
__decorate([
    (0, common_1.Get)('ping'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "ping", null);
__decorate([
    (0, common_1.Get)('profile'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUserProfile", null);
__decorate([
    (0, common_1.Get)('practicantes'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getPracticantes", null);
__decorate([
    (0, common_1.Get)('administrative'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getAdministrative", null);
__decorate([
    (0, common_1.Post)('create-user') // Change @Get to @Post
    //@UseGuards(RolesGuard) // Validación adicional para roles
    //@Roles('admin') // Solo admins pueden acceder
    //createUser(@Body() createUserDto: CreateUserDto) { // Use the DTO
    ,
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "createUser", null);
__decorate([
    (0, common_1.Post)('create-task')
    //@UseGuards(RolesGuard) // Validación adicional para roles
    //@Roles('admin') // Solo admins pueden acceder
    ,
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_task_dto_1.CreateTaskDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "createTask", null);
__decorate([
    (0, common_1.Get)('tasks'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getUserTasks", null);
__decorate([
    (0, common_1.Get)(':id/tasks'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getTasksByUser", null);
__decorate([
    (0, common_1.Get)(':id/details'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "obtenerDetails", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUserById", null);
UsersController = __decorate([
    (0, common_1.Controller)('users'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard)
    //@UseGuards(RolesGuard) // JWT obligatorio para todas las rutas -- Aplica el guard a todas las rutas de este controlador
    ,
    __metadata("design:paramtypes", [users_service_1.UsersService,
        authorization_service_1.AuthorizationService])
], UsersController);
exports.UsersController = UsersController;
