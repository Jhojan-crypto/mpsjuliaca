// src/services/authService.ts
/*const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000";

export const login = async (username: string, password: string) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ username, password }),
  });
  
  if (!response.ok) throw new Error("Login failed");
  
  /*const data = await response.json();
      setUser({ id: data.userId, username, role: data.role });
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }//
  return await response.json();
};*/


/*import axios from 'axios';
import { User } from '../types/types';

// Configuración inicial de Axios
const api = axios.create({
  baseURL: 'http://localhost:3000', // URL base de tu backend NestJS
  withCredentials: true,               // Para enviar cookies como las HTTP-only (si las usas en JWT)
});


export const login = async (credentials: { username: string; password: string }) :Promise<User>=> {

  // Implement the login logic here

  // Example:

  const response = await fetch('http://localhost:3000/auth/login', {

    method: 'POST',

    headers: { 'Content-Type': 'application/json' },

    body: JSON.stringify(credentials),

  });



  if (!response.ok) {

    throw new Error('Login failed');

  }



  const userData = await response.json();

  return userData; //retorna los datos del backend

};



export const logout = async () => {
  try {
    // Implement the logout logic here

    // Example:

    await fetch('http://localhost:3000/auth/logout', {
      method: 'POST',
    });  
  } catch (error) {
    console.error('Logout failed:', error);
    throw error;
  }
};

*/
import axios from 'axios';
import { User } from '../types/types';

// Configuración inicial de Axios
export const api = axios.create({
  baseURL: 'http://localhost:8080', // URL base de tu backend NestJS
  withCredentials: true,            // Para enviar cookies como las HTTP-only (si las usas en JWT)
});

export const login = async (credentials: { username: string; password: string }): Promise<User> => {
  const response = await api.post('/auth/login', credentials);

  if (!response.data) {
    throw new Error('Login failed');
  }

  return response.data;
};

export const practicantes = async (): Promise<User[]> => {
  const response = await api.get('/users/practicantes'); // Asegúrate de que esta ruta exista en tu backend
  return response.data; // Retorna la lista de practicantes
};

export const administratives = async (): Promise<void> => {
  const response = await api.get('/users/administrative'); // Asegúrate de que esta ruta exista en tu backend
  return response.data; // Retorna la lista de administrativo
};

export const logout = async (): Promise<void> => {
  await api.post('/auth/logout');
};