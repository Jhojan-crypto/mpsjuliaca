import { Controller, Get, Post, Body, Req, Res, UseGuards, Param, ForbiddenException, HttpStatus, HttpCode, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { Roles } from '../../decorators/roles.decorator';
import { RolesGuard } from '../guards/roles.guard';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { UsersService } from '../../modules/users/users.service';
import { AuthorizationService } from '../../modules/auth/authorization.service';
//import { UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from '../../dto/create-user.dto'; // Import the DTO
import { Request, Response } from 'express'; // Add this import
import { CreateTaskDto } from '../../dto/create-task.dto'; // Add this import


@Controller('users')
@UseGuards(JwtAuthGuard) 
//@UseGuards(RolesGuard) // JWT obligatorio para todas las rutas -- Aplica el guard a todas las rutas de este controlador
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authorizationService: AuthorizationService,
  ) {}

  // --------------------- Funciones compartidas ---------------------
  @Get('ping')
  ping() {
    return { message: 'Pong!' };
  }
  
  // Perfil del usuario autenticado
  @Get('profile')
  async getUserProfile(@Req() req:Request) {
    if (!req.user) {
      throw new UnauthorizedException('Usuario no autenticado.');
    }
  
    // Obtener el userId desde el token JWT decodificado
    const userId = req.user.userId;
  
    // Consulta en la base de datos
    const user = await this.usersService.getUserById(userId);
  
    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado.');
    }
  
    return user; // Retorna el usuario al cliente
  }

  @Get('practicantes')
  async getPracticantes() { 
    // Obtener los usuarios con el rol de 'practicante' desde el servicio
    const practicantes = await this.usersService.getUsersByRole('practicante');
    return practicantes;
  }
  @Get('administrative')
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
  @Post('create-user') // Change @Get to @Post
  //@UseGuards(RolesGuard) // Validación adicional para roles
  //@Roles('admin') // Solo admins pueden acceder
  //createUser(@Body() createUserDto: CreateUserDto) { // Use the DTO
  async createUser(
  @Body() createUserDto: CreateUserDto, 
  @Res() res: Response
  ) {
    try {
      const user = await this.usersService.create(createUserDto);
      return res.status(HttpStatus.CREATED).json(user);
    } catch (error) {
      console.error('Error creating user:', error);
      return res.status(403).send('Acceso denegado: no se pudo insertar en la base de datos');
    }
  }

  // Crear una nueva tarea (solo admins)
  @Post('create-task')
  //@UseGuards(RolesGuard) // Validación adicional para roles
  //@Roles('admin') // Solo admins pueden acceder
  createTask(@Body() createTaskDto: CreateTaskDto) { // Use the DTO
    return this.usersService.createTask(createTaskDto);
  }

  @Get('tasks')
  getUserTasks(@Req() req:Request) {
    if (!req.user) {
      throw new UnauthorizedException('Usuario no autenticado.');
    }
    return this.usersService.getTasksByUser(req.user.userId);
  }

  @Get(':id/tasks')
  async getTasksByUser(@Param('id') id: string) {
    const tasks = await this.usersService.getTasksByUser(id);
    if (!tasks) {
      throw new NotFoundException('Tareas no encontradas.');
    }
    return tasks;
  }

    @Get(':id/details')
    async obtenerDetails(@Param('id') id: string) {
      
      const user = await this.usersService.getUserById(id);
      if (!user) {
        throw new NotFoundException('Usuario no encontrado.');
      }
      return user;
    }

    @Get(':id')
    async getUserById(@Param('id') id: string) {
      return this.usersService.getUserById(id);
    }
}
