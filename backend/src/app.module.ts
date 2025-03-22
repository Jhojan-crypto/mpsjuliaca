/*import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
//import { JwtModule } from '@nestjs/jwt';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
//import { AppService } from './services/app.service';
import { User, UserSchema } from './modules/users/user.schema';
import { AuthService } from './common/services/auth.middleware';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthController } from './common/controllers/auth.controller';
import { AuthModule } from './modules/auth/auth.module';
import { UsersController } from './modules/users/users.controller';
import { UsersModule } from './modules/users/users.module';
import { TasksController } from './modules/tasks/tasks.controller';
import { TasksModule } from './modules/tasks/tasks.module';

@Module({
  //imports: [EventEmitterModule.forRoot(), ScheduleModule.forRoot()],
  imports: [
    // Conexión a MongoDB
    MongooseModule.forRoot('mongodb://localhost:27017/nestjs-app'),
    // Configuración del esquema para usuarios
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    /*JwtModule.register({
      secret: 'super-secret-key', // Cambiar por una clave segura
      signOptions: { expiresIn: '1h' }, // Token expira en 1 hora
    }),//
    EventEmitterModule.forRoot(),
    ScheduleModule.forRoot(),
    AuthModule,
    UsersModule,
    TasksModule,
  ],
  controllers: [AppController, AuthController, UsersController, TasksController],
  providers: [AuthService, JwtAuthGuard],
})
export class AppModule {}
*/
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthMiddleware } from './auth.middleware';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseConfig } from './config/database.config';
import { AppConfigModule } from './config/config.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(DatabaseConfig.getMongoURI(), DatabaseConfig.getMongoOptions()),
    /*JwtModule.register({
      secret: 'tu_secreto',
      signOptions: { expiresIn: '1h' },
    }),*/
    UsersModule,// Módulo de usuarios
    AuthModule,  // Módulo de autenticación
    AppConfigModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware) // Aplicar el middleware
      .exclude(
        { path: 'auth/login', method: RequestMethod.POST } // Excluir la ruta de login no debería interceptar solicitudes como POST ya que estas no necesitan autenticación
        //{ path: '/auth/register', method: RequestMethod.POST },
      )  //Excluir rutas públicas
      .forRoutes('*'); // A todas las rutas de la aplicación
  }
}
