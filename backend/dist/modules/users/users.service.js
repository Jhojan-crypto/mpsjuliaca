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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("./user.schema"); // Esquema de usuario
const task_schema_1 = require("./task.schema"); // Esquema de tareas (si existe)
const common_2 = require("@nestjs/common");
let UsersService = class UsersService {
    constructor(userModel, // Modelo de usuario
    taskModel) {
        this.userModel = userModel;
        this.taskModel = taskModel;
    }
    async create(createUserDto) {
        const { username, password, email, role } = createUserDto;
        // Verificar que todos los campos requeridos estén presentes
        if (!username || !password || !email || !role) {
            console.log('Falta rellenar un campo');
            throw new common_2.BadRequestException('Todos los campos son obligatorios.');
        }
        const createdUser = new this.userModel(createUserDto);
        return createdUser.save();
    }
    // Obtener el perfil de un usuario por ID
    async getUserById(id) {
        if (!mongoose_2.Types.ObjectId.isValid(id)) {
            throw new common_2.BadRequestException('ID de usuario no válido.');
        }
        return this.userModel.findById(id).exec();
    }
    // Obtener las tareas asignadas a un usuario
    async getTasksByUser(userId) {
        return this.taskModel.find({ assignedTo: userId }).exec();
    }
    // Obtener detalles del usuario autenticado
    async getDetailsByUser(userId) {
        if (!mongoose_2.Types.ObjectId.isValid(userId)) {
            throw new common_2.BadRequestException('ID de usuario no válido.');
        }
        return this.userModel.findById(userId).exec();
    }
    // Crear una nueva tarea
    async createTask(createTaskDto) {
        const newTask = new this.taskModel(createTaskDto);
        return newTask.save();
    }
    // Obtener usuarios por rol
    async getUsersByRole(role) {
        return this.userModel.find({ role }).exec(); // Buscar usuarios con el rol especificado
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)(task_schema_1.Task.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], UsersService);
exports.UsersService = UsersService;
