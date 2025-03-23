import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { Tooltip } from 'react-tooltip'; // Usaremos react-tooltip para mostrar detalles
import 'react-tooltip/dist/react-tooltip.css';
import Navbar from '../../components/ui/Navbar'; // Import the Navbar component
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // Import the AuthContext

const API_URL = 'https://mpsjuliaca-production.up.railway.app';

const getPeruvianHolidays = (year: number) => [
  `${year}-01-01`, // Año Nuevo
  `${year}-04-14`, // Viernes Santo
  `${year}-05-01`, // Día del Trabajo
  `${year}-06-29`, // San Pedro y San Pablo
  `${year}-07-28`, // Independencia del Perú
  `${year}-07-29`, // Independencia del Perú
  `${year}-08-30`, // Santa Rosa de Lima
  `${year}-10-08`, // Combate de Angamos
  `${year}-11-01`, // Día de Todos los Santos
  `${year}-12-08`, // Inmaculada Concepción
  `${year}-12-25`, // Navidad
];

const generateMonthDays = (month: number, year: number) => {
  const startDate = dayjs(`${year}-${month}-01`);
  const daysInMonth = startDate.daysInMonth();

  const days = [];
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(dayjs(`${year}-${month}-${day}`));
  }

  return days;
};

export const TaskCalendar: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { state } = useAuth(); // Obtener el estado de autenticación
  const [currentMonth, setCurrentMonth] = useState(dayjs().month() + 1);
  const [currentYear, setCurrentYear] = useState(dayjs().year());
  const [monthDays, setMonthDays] = useState<dayjs.Dayjs[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);

  useEffect(() => {
    setMonthDays(generateMonthDays(currentMonth, currentYear));
  }, [currentMonth, currentYear]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`${API_URL}/users/${id}/tasks`, {
          withCredentials: true,
        });
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks', error);
      }
    };

    fetchTasks();
  }, [id]);

  const peruvianHolidays = getPeruvianHolidays(currentYear);

  const getIntensityClass = (taskCount: number, isCompleted: boolean) => {
    if (taskCount === 0) return 'bg-gray-200';
    if (isCompleted) return 'bg-green-600';
    if (taskCount < 5) return 'bg-yellow-200';
    if (taskCount < 10) return 'bg-yellow-400';
    return 'bg-yellow-600';
  };

  const handlePreviousMonth = () => {
    if (currentMonth === 1) {
      setCurrentMonth(12);
      setCurrentYear((prev) => prev - 1);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 12) {
      setCurrentMonth(1);
      setCurrentYear((prev) => prev + 1);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
  };

  const getTasksForDay = (day: dayjs.Dayjs) => {
    return tasks.filter((task) => dayjs(task.dueDate).isSame(day, 'day'));
  };

  const handleCompleteTask = async (taskId: string) => {
    if (state.user?.role !== 'admin') {
      alert('No tienes los permisos para marcar tareas como completadas');
      return;
    }
    try {
      await axios.put(`${API_URL}/tasks/${taskId}/complete`, {}, {
        withCredentials: true,
      });
      setCompletedTasks((prev) => [...prev, taskId]);
    } catch (error) {
      console.error('Error completing task', error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={handlePreviousMonth}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Mes Anterior
          </button>
          <h2 className="text-2xl font-bold">
            {dayjs(`${currentYear}-${currentMonth}-01`).format('MMMM YYYY')}
          </h2>
          <button
            onClick={handleNextMonth}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Mes Siguiente
          </button>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map((day) => (
            <div key={day} className="text-center font-bold">
              {day}
            </div>
          ))}
          
          {monthDays.map((day) => {
            const tasksForDay = getTasksForDay(day);
            const taskCount = tasksForDay.length;
            const isHoliday = peruvianHolidays.includes(day.format('YYYY-MM-DD'));
            const isCompleted = tasksForDay.every((task) => completedTasks.includes(task._id));
            const baseClass = `w-10 h-10 flex items-center justify-center rounded ml-16`;
            let appliedClass = getIntensityClass(taskCount, isCompleted);
            if (isHoliday) {
              appliedClass = 'bg-red-500 text-white inline-block';
            }
            return (
              <div
                key={day.toString()}
                className={`${baseClass} ${appliedClass}`}
                data-tooltip-id={`tooltip-${day.format('YYYY-MM-DD')}`}
              >
                {day.date()}
                <Tooltip id={`tooltip-${day.format('YYYY-MM-DD')}`} clickable>
                  <span>{isHoliday ? 'Día Festivo' : `${taskCount} tareas`}</span>
                  {tasksForDay.map((task) => (
                    <div key={task._id}>
                      <strong>{task.title}</strong>: {task.description}
                      {!completedTasks.includes(task._id) && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCompleteTask(task._id);
                          }}
                          className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600"
                        >
                          Marcar como completada
                        </button>
                      )}
                    </div>
                  ))}
                </Tooltip>
              </div>
            );
          })}
        </div>

        <div className="mt-4 flex items-center space-x-4">
          <div className="flex items-center">
            <span className="w-4 h-4 bg-gray-200 inline-block rounded mr-2"></span>
            Sin tareas
          </div>
          <div className="flex items-center">
            <span className="w-4 h-4 bg-yellow-200 inline-block rounded mr-2"></span>
            1-4 tareas
          </div>
          <div className="flex items-center">
            <span className="w-4 h-4 bg-yellow-400 inline-block rounded mr-2"></span>
            5-9 tareas
          </div>
          <div className="flex items-center">
            <span className="w-4 h-4 bg-yellow-600 inline-block rounded mr-2"></span>
            10+ tareas
          </div>
          <div className="flex items-center">
            <span className="w-4 h-4 bg-green-600 inline-block rounded mr-2"></span>
            Tareas completadas
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCalendar;