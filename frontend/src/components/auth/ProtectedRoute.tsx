// src/components/auth/ProtectedRoute.tsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';


interface ProtectedRouteProps {
  children: JSX.Element;
  roles: string[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, roles }) => {
  const { state } = useAuth();

  if (!state.isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (!roles.includes(state.user?.role || '')) {
    return <Navigate to="/not-authorized" />;
  }

  return children;
};