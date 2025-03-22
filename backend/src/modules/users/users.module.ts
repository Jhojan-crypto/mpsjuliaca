import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from '../../common/controllers/users.controller';
import { TasksController } from '../../common/controllers/tasks.controller';
import { UsersService } from './users.service';
import { User, UserSchema } from './user.schema';
import { Task, TaskSchema } from './task.schema';
import { AuthModule } from '../auth/auth.module';
import { TasksService } from './tasks.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Task.name, schema: TaskSchema },
    ]),
    forwardRef(() => AuthModule), // Importa AuthModule para usar AuthorizationService
  ],
  controllers: [UsersController,TasksController],
  providers: [UsersService, TasksService],
  exports: [UsersService, MongooseModule],
})
export class UsersModule {}
