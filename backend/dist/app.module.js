"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
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
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const auth_middleware_1 = require("./auth.middleware");
const auth_module_1 = require("./modules/auth/auth.module");
const users_module_1 = require("./modules/users/users.module");
const mongoose_1 = require("@nestjs/mongoose");
const database_config_1 = require("./config/database.config");
const config_module_1 = require("./config/config.module");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(auth_middleware_1.AuthMiddleware) // Aplicar el middleware
            .exclude({ path: 'auth/login', method: common_1.RequestMethod.POST } // Excluir la ruta de login no debería interceptar solicitudes como POST ya que estas no necesitan autenticación
        //{ path: '/auth/register', method: RequestMethod.POST },
        ) //Excluir rutas públicas
            .forRoutes('*'); // A todas las rutas de la aplicación
    }
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            mongoose_1.MongooseModule.forRoot(database_config_1.DatabaseConfig.getMongoURI(), database_config_1.DatabaseConfig.getMongoOptions()),
            /*JwtModule.register({
              secret: 'tu_secreto',
              signOptions: { expiresIn: '1h' },
            }),*/
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            config_module_1.AppConfigModule,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
