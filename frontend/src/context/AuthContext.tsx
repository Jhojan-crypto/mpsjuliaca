import React, { createContext, useReducer, ReactNode, useContext } from 'react';
import * as authService from '../services/authService';
import { AuthState, AuthAction, AuthContextType } from '../types/types';

// Estado inicial
const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

// Reducer tipado
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, isAuthenticated: true, user: action.payload };
    case 'LOGOUT':
      return { ...state, isAuthenticated: false, user: null };
    default:
      return state;
  }
};

// Contexto tipado
export const AuthContext = createContext<AuthContextType | null>(null);

// Provider con tipos correctos
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = async (credentials: { username: string; password: string }) => {
    const userData = await authService.login(credentials);
    dispatch({ type: 'LOGIN', payload: { ...userData, id: userData._id || userData.id } });
  };

  const logout = async () => {
    await authService.logout();
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{ state, dispatch, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook tipado
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
};