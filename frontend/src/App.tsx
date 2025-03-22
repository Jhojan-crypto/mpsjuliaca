// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LoginPage } from './pages/auth/LoginPage';
import { TaskCalendar } from './pages/personalized/TaskCalendar';
import {DetailUser} from '../src/pages/personalized/DetailUser';
import { UserDashboard } from '../src/pages/common/UserDasboard';
import { CreateTasks } from './pages/asignar/CreateTasks';
import { NotFound } from './pages/common/NotFound';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { CreateUser } from './pages/asignar/CreateUser'; // Import the CreateUser component

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          <Route 
            path="/user-dashboard" 
            element={
              <ProtectedRoute roles={['practicante', 'admin']}>
                <UserDashboard />
              </ProtectedRoute>
            } 
          />
          
          {/*<Route path="/practicantes/:id/detalles" element={<PracticanteDetails />} />*/}
          <Route 
            path="/practicantes/:id/tasks" 
            element={
              <ProtectedRoute roles={['admin']}>
                <CreateTasks />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/practicante/:id/calendario" 
            element={
              <ProtectedRoute roles={['practicante']}>
                <TaskCalendar />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/practicantes/:id/calendario" 
            element={<TaskCalendar />} />

          <Route 
            path="/users/:id/details" 
            element={<DetailUser />} />

          <Route 
            path="/administrative/:id/calendario" 
            element={
              <ProtectedRoute roles={['admin']}>
                <TaskCalendar />
              </ProtectedRoute>
            } 
          />
        
         <Route 
            path="/administrative/:id/details" 
            element={
              <ProtectedRoute roles={['admin']}>
                <DetailUser />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/new-user" 
            element={
              <ProtectedRoute roles={['admin']}>
                <CreateUser />
              </ProtectedRoute>
            } 
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;