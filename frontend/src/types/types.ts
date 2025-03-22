import { Dispatch } from 'react';

// Tipo para usuario
export interface User {
  id: string;
  _id?: string; 
  username: string;
  email: string;
  role: string;
  calendario: string;
  tareas: string;
  token: string;
}

// Tipos para el estado
export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

// Tipos para las acciones
export type AuthAction = 
  | { type: 'LOGIN'; payload: User }
  | { type: 'LOGOUT' };

// Tipo para el contexto
export type AuthContextType = {
  state: AuthState;
  dispatch: Dispatch<AuthAction>;
  login: (credentials: { username: string; password: string }) => Promise<void>;
  logout: () => void;
};