import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from 'react-router-dom';
import { User } from '../../types/types';
import defaultUserIcon from '../../assets/icondefault_user.png';

export const Navbar: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const { state, logout } = useAuth();
  const navigate = useNavigate();
  
  const handleCalendar_propio = (id: string, role: string) => {
    const path = role === 'admin' ? `/administrative/${id}/calendario` : `/practicante/${id}/calendario`;
    navigate(path);
  };

  const handleDetails = (id: string) => {
    if (id) {
      navigate(`/users/${id}/details`);
    } else {
      console.error('Usuario no autenticado o ID no encontrado');
    }
  };

  useEffect(() => {
    const loadCurrentUser = async () => {
      if (state.user) {
        const mappedUser = { ...state.user, id: state.user._id || state.user.id };
        setCurrentUser(mappedUser);
        console.log('Current User:', mappedUser);
      }
    };

    loadCurrentUser();
  }, [state.user]);

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <Link to="/user-dashboard" className="hover:text-gray-400">Home</Link>
        {currentUser && (
          <button 
            key={currentUser.id}
            onClick={() => handleCalendar_propio(currentUser.id, currentUser.role)} 
            className="hover:text-gray-400"
          >
            Mi Calendario
          </button>
        )}
        {state.user?.role === "admin" && (
          <Link to="/new-user" className="hover:text-gray-400">Nuevo Usuario</Link>
        )}
      </div>
      <div className="flex items-center space-x-4">
        {currentUser && (
          <button 
            onClick={() => handleDetails(currentUser.id)} 
            className="flex items-center hover:text-gray-400"
          >
            {currentUser.username}
            <img src={defaultUserIcon} alt="User Icon" className="mr-0 ml-3 w-10 h-10 rounded-full" />
          </button>
        )}
        <span className="text-white text-3xl font-bold relative" style={{ top: '-4px' }}>|</span>
        {state.user ? (
          <>
            <button onClick={logout} className="bg-red-800 hover:bg-red-700 text-white py-1 px-2 rounded">
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-2 rounded">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;