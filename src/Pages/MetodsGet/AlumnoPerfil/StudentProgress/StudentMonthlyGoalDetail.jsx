import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon
} from '@heroicons/react/24/solid';
import dayjs from 'dayjs';
import RegistrarProgresoModal from './RegistrarProgresoModal';
import CardProgreso from './CardProgreso';

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

const StudentMonthlyGoalDetail = ({ studentId, reloadTrigger }) => {
  const [goal, setGoal] = useState(null);
  const [loading, setLoading] = useState(true);

  const [mostrarModalProgreso, setMostrarModalProgreso] = useState(false);
  const [semanaSeleccionada, setSemanaSeleccionada] = useState(null);
  const [mostrarFormSemana, setMostrarFormSemana] = useState(null);

  const fetchGoal = async () => {
    try {
      const fechaActual = new Date();
      const mes = fechaActual.getMonth() + 1;
      const anio = fechaActual.getFullYear();

      const queryString = new URLSearchParams({
        student_id: studentId,
        mes,
        anio
      }).toString();

      const res = await axios.get(
        `http://localhost:8080/student-monthly-goals?${queryString}`
      );

      // Si el endpoint devuelve un array (porque usas findAll), tomá el primer elemento o el que corresponda
      const objetivo =
        Array.isArray(res.data) && res.data.length > 0 ? res.data[0] : null;

      setGoal(objetivo);
    } catch (error) {
      console.error('Error al obtener el objetivo:', error);
      setGoal(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGoal();
  }, [studentId, reloadTrigger]);

  if (loading)
    return <div className="text-center mt-10 text-gray-500">Cargando...</div>;

  if (!goal)
    return (
      <div className="text-center mt-10 text-blue-900">
        No cargo el objetivo aún.
      </div>
    );

  const estado = goal.estado || 'EN_PROGRESO'; // Mueve esta línea aquí, después de la validación

  // Calcular días desde la creación
  const createdAt = dayjs(goal.created_at);
  const hoy = dayjs();
  const diasDesdeCreacion = hoy.diff(createdAt, 'day');

  // Función para saber si ya existe un registro de progreso para una semana específica
  const progresoYaRegistrado = (semana) => {
    if (!goal.progressList || !Array.isArray(goal.progressList)) return false;

    // Siempre crear nuevas instancias para evitar mutación
    const inicioSemana = dayjs(goal.created_at).add((semana - 1) * 7, 'day');
    const finSemana = dayjs(goal.created_at).add(semana * 7, 'day');

    console.log(
      `Semana ${semana}: desde ${inicioSemana.format(
        'YYYY-MM-DD'
      )} hasta ${finSemana.format('YYYY-MM-DD')}`
    );

    return goal.progressList.some((p) => {
      const fechaProgreso = dayjs(p.fecha);
      const dentroRango = fechaProgreso.isBetween(
        inicioSemana,
        finSemana,
        null,
        '[]' // incluye límites
      );
      console.log(
        `  Fecha progreso: ${fechaProgreso.format(
          'YYYY-MM-DD'
        )} está dentro? ${dentroRango}`
      );
      return dentroRango;
    });
  };

  // Calcular semanas disponibles
  const semanasDisponibles = [];
  for (let i = 1; i <= 4; i++) {
    if (diasDesdeCreacion >= i * 7 && !progresoYaRegistrado(i)) {
      semanasDisponibles.push(i);
    }
  }

  return (
    <>
      <div
        className="max-w-4xl mx-auto mt-6
      flex flex-col md:flex-row items-start gap-y-6 md:gap-x-10
      transition-transform duration-200 hover:scale-[1.02]"
      >
        {/* Objetivo mensual */}
        <div className="flex-1 bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          {/* <div
            className={`flex flex-col items-center justify-center rounded-full p-5 ${statusColors[estado]}
           shrink-0 w-20 h-20 md:w-24 md:h-24 mb-4 md:mb-0`}
          >
            <div className="w-6 h-12 md:w-6 md:h-16">{statusIcons[estado]}</div>
            <span className="mt-2 font-semibold text-xs md:text-sm tracking-wide text-center">
              {estado.replace('_', ' ')}
            </span>
          </div> */}

          <h3 className="text-xl font-bold text-blue-700 mb-4 text-center md:text-left tracking-wide">
            Objetivo: {goal.objetivo}
          </h3>

          <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-gray-700 text-sm md:text-base">
            {/* Aquí tus datos */}
            <div>
              <span className="font-semibold text-blue-600">Mes:</span>{' '}
              {goal.mes}
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
              <span className="font-semibold text-blue-600">
                Grasa Corporal:
              </span>{' '}
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

          <div className="mt-6 space-y-2">
            {semanasDisponibles.length === 0 && (
              <p className="text-gray-600">
                No hay semanas disponibles para registrar progreso.
              </p>
            )}
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

        {/* CardProgreso a la derecha en desktop, debajo en móvil */}
        <div className="w-full md:w-96 flex-shrink-0 bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <CardProgreso studentId={studentId} />
        </div>
      </div>

      {mostrarFormSemana && (
        <RegistrarProgresoModal
          semana={mostrarFormSemana}
          studentId={studentId}
          onClose={() => setMostrarFormSemana(null)}
        />
      )}
    </>
  );
};

export default StudentMonthlyGoalDetail;
