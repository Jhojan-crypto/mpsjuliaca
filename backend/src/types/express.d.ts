//import { Request } from 'express';
import { Task } from '../modules/users/task.schema';
import { User } from '../modules/users/user.schema';

declare global {
  namespace Express {
    interface Request {
      user?: any; // Cambia `any` por una interfaz si tienes un modelo específico
      task?: any; // Cambia `any` por una interfaz si tienes un modelo específico
    }
  }
}
