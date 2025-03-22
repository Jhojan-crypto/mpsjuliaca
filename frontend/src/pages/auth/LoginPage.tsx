import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LoginForm } from '../../components/auth/LoginForm';
import OIPImage from '../../assets/OIP.jpg'; // Ajusta la ruta según tu estructura de proyecto
import ImagesImage from '../../assets/images.png'; // Ajusta la ruta según tu estructura de proyecto

export const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login({ username, password });
      navigate('/user-dashboard'); // Navegar a UserDashboard
    } catch (error) {
      console.error('Error de inicio de sesión:', error);
      alert('Usuario o contraseña incorrectos');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute inset-0 flex">
        <div className="w-5/8 h-full">
          <img src={OIPImage} alt="OIP" className="w-full h-full object-cover opacity-50" />
        </div>
        <div className="w-3/8 h-full">
          <img src={ImagesImage} alt="Images" className="w-full h-full object-cover opacity-50" />
        </div>
      </div>
      <div className="max-w-md w-full space-y-8 relative z-10">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Iniciar Sesión
          </h2>
        </div>
        <LoginForm
          username={username}
          password={password}
          onUsernameChange={setUsername}
          onPasswordChange={setPassword}
          email={email}
          onEmailChange={setEmail}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};