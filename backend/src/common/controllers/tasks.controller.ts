import { Controller, Put, Param, UseGuards, UnauthorizedException } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { TasksService } from '../../modules/users/tasks.service';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Put(':id/complete')
  async completeTask(@Param('id') id: string) {
    const task = await this.tasksService.completeTask(id);
    if (!task) {
      throw new UnauthorizedException('Tarea no encontrada o no autorizada.');
    }
    return task;
  }
}