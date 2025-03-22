import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { JwtConfig } from '../../config/jwt.config';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly jwtConfig: JwtConfig,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  /*async validateUser(username: string, password: string): Promise<User | null> {
    //Buscar al usuario en la base de datos
    const user = await this.userModel.findOne({ username }).exec(); // No compares directamente en Mongo
    //Validar la contraseña utilizando bcrypt
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }*/
 
    async validateUser(username: string, password: string): Promise<User | null> {
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
  generateToken(userId: string, role: string): string {
    return this.jwtService.sign(
      { userId, role },
      {
        secret: this.jwtConfig.getSecret(),
        expiresIn: this.jwtConfig.getExpiresIn(), // Usamos la configuración de expiración
      }
    );
  }

  async login(user: User) {
    const payload = { userId: user.id, role: user.role };
    return this.jwtService.sign(payload, {
      secret: this.jwtConfig.getSecret(),
      expiresIn: this.jwtConfig.getExpiresIn(),
    });
  }  
}
