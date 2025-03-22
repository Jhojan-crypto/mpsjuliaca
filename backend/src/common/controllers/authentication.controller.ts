import { Controller, Post, Res, Body } from '@nestjs/common';
import { AuthenticationService } from '../../modules/auth/authentication.service';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { JwtConfig } from '../../config/jwt.config';
import * as jwt from 'jsonwebtoken';

@Controller('auth')
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly jwtConfig: JwtConfig,
    private readonly jwtService: JwtService, // Inject JwtService properly
  ) {}

  @Post('login')
  async login(
    @Body() body : { username: string; password: string },
    @Res() res: Response
  ) {
    const { username, password } = body;

    // Validar usuario con AuthenticationService
    const user = await this.authenticationService.validateUser(username, password);

    if (!user) {
      return res.status(403).send('Acceso denegado: credenciales inválidas. en Fetch/XHR');
    }

    // Generar el token usando AuthenticationService
    const token = this.authenticationService.generateToken(user.id, user.role);
    console.log('Token generado:', token);

    //const token = this.authenticationService.login(user);
    
    // Guardar el token en una cookie
    res.cookie(this.jwtConfig.getCookieName(), token, {
      httpOnly: true, // Impide que el token sea accesible desde JavaScript
      //secure: process.env.NODE_ENV === 'production', // Usar cookies seguras solo en producción
      sameSite: 'strict', // Esto ayuda a proteger contra CSRF
    });

    // Redirigir según el rol del usuario
    /*if (user.role === 'admin') {
      res.redirect('/admin');
    } else if (user.role === 'practicante') {
      res.redirect(`/practicante/${user._id}`);
    } else {
      res.status(403).send('Acceso denegado: rol no autorizado.');
    }*/
    return res.json({ message: 'Inicio de sesión exitoso.', role: user.role, id: user.id, username: user.username });
  }


  @Post('logout')
  async logout(@Res() res: Response) {
    // Limpiar la cookie que contiene el token
    res.clearCookie(this.jwtConfig.getCookieName(), {
      httpOnly: true, // Asegura que sea la misma cookie que fue creada
      //secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    return res.json({ message: 'Cierre de sesión exitoso.' });
  }
}
