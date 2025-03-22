import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from './user.schema'; // Esquema de usuario
import { Task } from './task.schema'; // Esquema de tareas (si existe)
import { BadRequestException } from '@nestjs/common';
import { CreateUserDto } from '../../dto/create-user.dto';
import { CreateTaskDto } from '../../dto/create-task.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>, // Modelo de usuario
    @InjectModel(Task.name) private readonly taskModel: Model<Task>, // Modelo de tareas
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { username, password, email, role } = createUserDto;

    // Verificar que todos los campos requeridos estén presentes
    if (!username || !password || !email || !role) {
      console.log('Falta rellenar un campo');
      throw new BadRequestException('Todos los campos son obligatorios.');
    }

    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  // Obtener el perfil de un usuario por ID
  async getUserById(id: string): Promise<User | null> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('ID de usuario no válido.');
    }
    return this.userModel.findById(id).exec();
  }

  // Obtener las tareas asignadas a un usuario
  async getTasksByUser(userId: string): Promise<Task[]> {
    return this.taskModel.find({ assignedTo: userId }).exec();
  }

  // Obtener detalles del usuario autenticado
  async getDetailsByUser(userId: string): Promise<User | null> {
    if (!Types.ObjectId.isValid(userId)) {
      throw new BadRequestException('ID de usuario no válido.');
    }
    return this.userModel.findById(userId).exec();
  }

  

  // Crear una nueva tarea
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const newTask = new this.taskModel(createTaskDto);
    return newTask.save();
  }

  // Obtener usuarios por rol
  async getUsersByRole(role: string): Promise<User[]> {
    return this.userModel.find({ role }).exec(); // Buscar usuarios con el rol especificado
  }
}
