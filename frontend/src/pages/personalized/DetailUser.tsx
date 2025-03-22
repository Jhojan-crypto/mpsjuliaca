import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../../services/authService'; // Importar la configuración de axios
import Navbar from '../../components/ui/Navbar';

export const DetailUser: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (id && id.match(/^[0-9a-fA-F]{24}$/)) { // Verifica que el ID sea un ObjectId válido
        try {
          const response = await api.get(`/users/${id}/details`);
          setUser(response.data);
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      } else {
        console.error('ID de usuario no válido');
      }
    };
    fetchUser();
  }, [id]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1>User Details</h1>
        <p>{user.name}</p>
        <h2 className="text-2xl font-bold mb-4">Detalles del Usuario</h2>
        <div className="mb-4">
          <strong>Nombre:</strong> {user.username}
        </div>
        <div className="mb-4">
          <strong>Email:</strong> {user.email}
        </div>
        <div className="mb-4">
          <strong>Rol:</strong> {user.role}
        </div>
      </div>
    </div>
  );
};

export default DetailUser;