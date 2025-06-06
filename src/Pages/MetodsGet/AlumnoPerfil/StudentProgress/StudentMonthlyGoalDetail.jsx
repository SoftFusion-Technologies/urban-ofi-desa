import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon
} from '@heroicons/react/24/solid';
import dayjs from 'dayjs';

const statusColors = {
  COMPLETADO: 'text-green-600 bg-green-100',
  EN_PROGRESO: 'text-yellow-600 bg-yellow-100',
  NO_CUMPLIDO: 'text-red-600 bg-red-100'
};

const statusIcons = {
  COMPLETADO: <CheckCircleIcon className="w-6 h-6" />,
  EN_PROGRESO: <ClockIcon className="w-6 h-6" />,
  NO_CUMPLIDO: <XCircleIcon className="w-6 h-6" />
};

const StudentMonthlyGoalDetail = ({ studentId }) => {
  const [goal, setGoal] = useState(null);
  const [loading, setLoading] = useState(true);

  const [mostrarModalProgreso, setMostrarModalProgreso] = useState(false);
  const [semanaSeleccionada, setSemanaSeleccionada] = useState(null);

  const fetchGoal = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/student-monthly-goals/${studentId}`
      );

      setGoal(res.data);
    } catch (error) {
      console.error('Error al obtener el objetivo:', error);
      setGoal(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGoal();
  }, [studentId]);

  if (loading)
    return <div className="text-center mt-10 text-gray-500">Cargando...</div>;

  if (!goal)
    return (
      <div className="text-center mt-10 text-blue-900">
        No cargo el objetivo aún.
      </div>
    );

  const estado = goal.estado || 'EN_PROGRESO'; // Mueve esta línea aquí, después de la validación

  const createdAt = dayjs(goal.created_at);
  const hoy = dayjs();
  const diasDesdeCreacion = hoy.diff(createdAt, 'day');

  // Función para saber si ya existe un registro de progreso para una semana específica
  const progresoYaRegistrado = (semana) => {
    if (!goal.progressList) return false;

    return goal.progressList.some(
      (p) =>
        dayjs(p.fecha).isSameOrAfter(createdAt.add((semana - 1) * 7, 'day')) &&
        dayjs(p.fecha).isBefore(createdAt.add(semana * 7, 'day'))
    );
  };

  // Calcular semanas que ya pasaron y no tienen progreso registrado aún
  const semanasDisponibles = [];
  for (let i = 1; i <= 4; i++) {
    if (diasDesdeCreacion >= i * 7 && !progresoYaRegistrado(i)) {
      semanasDisponibles.push(i);
    }
  }
  
  return (
    <div
      className="max-w-md mx-auto mt-6 p-6 bg-white rounded-xl shadow-lg border border-gray-200
             flex flex-col md:flex-row items-center gap-6 transition-transform duration-200
             hover:scale-[1.02]"
      style={{ marginLeft: '1rem' }} // Mover un poco a la izquierda
    >
      {/* Indicador de Estado */}
      <div
        className={`flex flex-col items-center justify-center rounded-full p-5 ${statusColors[estado]}
                shrink-0 w-20 h-20 md:w-24 md:h-24`}
      >
        <div className="w-6 h-12 md:w-6 md:h-16">{statusIcons[estado]}</div>
        <span className="mt-2 font-semibold text-xs md:text-sm tracking-wide">
          {estado.replace('_', ' ')}
        </span>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 w-full">
        <h3 className="text-xl font-bold text-blue-700 mb-4 text-center md:text-left tracking-wide">
          Objetivo: {goal.objetivo}
        </h3>

        <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-gray-700 text-sm md:text-base">
          <div>
            <span className="font-semibold text-blue-600">Mes:</span> {goal.mes}
          </div>
          <div>
            <span className="font-semibold text-blue-600">Año:</span>{' '}
            {goal.anio}
          </div>
          <div>
            <span className="font-semibold text-blue-600">Altura:</span>{' '}
            {goal.altura_cm ?? '—'} cm
          </div>
          <div>
            <span className="font-semibold text-blue-600">Peso:</span>{' '}
            {goal.peso_kg ?? '—'} kg
          </div>
          <div>
            <span className="font-semibold text-blue-600">Edad:</span>{' '}
            {goal.edad ?? '—'} años
          </div>
          <div>
            <span className="font-semibold text-blue-600">Grasa Corporal:</span>{' '}
            {goal.grasa_corporal ?? '—'}%
          </div>
          <div>
            <span className="font-semibold text-blue-600">Cintura:</span>{' '}
            {goal.cintura_cm ?? '—'} cm
          </div>
          <div>
            <span className="font-semibold text-blue-600">IMC:</span>{' '}
            {goal.imc ?? '—'}
          </div>
          <div className="col-span-2">
            <span className="font-semibold text-blue-600">
              Control Antropométrico:
            </span>{' '}
            {goal.control_antropometrico ?? '—'}
          </div>
        </div>

        {/* Botones disponibles */}
        <div className="mt-6 space-y-2">
          {semanasDisponibles.map((semana) => (
            <button
              key={semana}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition w-full"
              onClick={() => setMostrarFormSemana(semana)}
            >
              Registrar progreso semana {semana}
            </button>
          ))}
        </div>

        <div className="mt-4 text-xs text-gray-400 text-right italic select-none">
          <div>Creado: {new Date(goal.created_at).toLocaleString()}</div>
          <div>Actualizado: {new Date(goal.updated_at).toLocaleString()}</div>
        </div>
      </div>
    </div>
  );
};

export default StudentMonthlyGoalDetail;
