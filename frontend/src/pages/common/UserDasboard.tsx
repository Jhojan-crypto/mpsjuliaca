// src/pages/common/UserDashboard.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { practicantes } from '../../services/authService';
import NavBar from '../../components/ui/Navbar';
import { User } from '../../types/types';

export const UserDashboard: React.FC = () => {
  const [lospracticantes, setPracticantes] = useState<User[]>([]);
  const { state } = useAuth();
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  //const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPracticantes = async () => {
      try {
        setLoading(true);
        const data = await practicantes();
        setPracticantes(data.map((user: User) => ({ ...user, id: user._id || user.id })));
      } catch (err) {
        console.error('Error fetching practicantes:', err);
        //setError('No se pudieron cargar los practicantes. Intenta nuevamente más tarde.');
      } finally {
        setLoading(false);
      }
    };

    loadPracticantes();
  }, []) ;

  const handleDetails = (id: string) => {
    navigate(`/users/${id}/details`);
  };
  
  const handleTasks = (id: string) => {
    if (state.user?.role === 'admin') {
      navigate(`/practicantes/${id}/tasks`);
    } else {
      alert('No tienes los permisos para asignar tareas');
    }
  };
  const handleCalendar = (id: string) => {
    //const path = role === 'admin' ? `/administrative/${id}/calendario` : `/practicante/${id}/calendario`;
    navigate(`/practicantes/${id}/calendario`);
  };
  return (  
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">Lista de Practicantes</h1>
        <div className="bg-white shadow-md rounded-lg p-4">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Nombre</th>
                <th className="py-2 px-4 border-b">Enviar Mensaje</th>
                <th className="py-2 px-4 border-b">Tareas</th>
                <th className="py-2 px-4 border-b">Calendario</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4} className="py-2 px-4 text-center text-gray-500">
                    Cargando practicantes...
                  </td>
                </tr>
              ) : lospracticantes.length > 0 ? (
                lospracticantes.map((practicante) => (
                  <tr key={practicante.id} className="border-b">
                    <td
                      className="py-2 px-4 cursor-pointer hover:text-blue-500 hover:underline"
                      onClick={() => handleDetails(practicante.id)}
                    >
                      {practicante.username}
                    </td>
                    <td className="py-2 px-4 space-x-2 text-center">
                      <button
                        onClick={() => console.log("Enviar email a:", practicante.email)}
                        className="bg-teal-500 hover:bg-teal-700 text-white py-1 px-2 rounded"
                      >
                        Enviar Email
                      </button>
                    </td>
                    <td className="py-2 px-4 text-center">
                      <button
                        onClick={() => handleTasks(practicante.id)}
                        className="bg-green-500 hover:bg-green-700 text-white py-1 px-2 rounded"
                      >
                        Asignar
                      </button>
                    </td>
                    <td className="py-2 px-6 text-center">
                      {lospracticantes && (<button
                        key={practicante.id}
                        onClick={() => handleCalendar(practicante.id)}
                        className="bg-yellow-500 hover:bg-yellow-700 text-white py-1 px-2 rounded"
                      >
                         Ver
                      </button>)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="py-2 px-4 text-center text-gray-500">
                    No hay practicantes disponibles
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};