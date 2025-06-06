import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StudentMonthlyGoalDetail = ({ studentId }) => {
  const [goal, setGoal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

    if (studentId) fetchGoal();
  }, [studentId]);

  if (loading)
    return <div className="text-center mt-10 text-gray-500">Cargando...</div>;

  if (!goal)
    return (
      <div className="text-center mt-10 text-blue-900">
        No se encontró el objetivo.
      </div>
    );

  return (
    <div className="max-w-xl mx-auto mt-8 p-5 bg-white rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-xl font-semibold text-indigo-700 mb-4 text-center">
        Objetivo Mensual
      </h2>

      {/* Información básica */}
      <div className="flex justify-between text-sm text-gray-600 mb-4">
        <div>
          <div>
            <span className="font-medium">ID:</span> {goal.id}
          </div>
          <div>
            <span className="font-medium">Estudiante:</span> {goal.student_id}
          </div>
        </div>
        <div className="text-right">
          <div>
            <span className="font-medium">Mes:</span> {goal.mes}
          </div>
          <div>
            <span className="font-medium">Año:</span> {goal.anio}
          </div>
        </div>
      </div>

      {/* Objetivo */}
      <div className="mb-5 p-4 bg-indigo-50 rounded text-gray-800 text-center font-medium">
        {goal.objetivo}
      </div>

      {/* Control antropométrico */}
      <div className="grid grid-cols-2 gap-3 text-sm text-gray-700 mb-4">
        <div>
          <span className="font-semibold">Altura:</span> {goal.altura_cm ?? '—'}{' '}
          cm
        </div>
        <div>
          <span className="font-semibold">Peso:</span> {goal.peso_kg ?? '—'} kg
        </div>
        <div>
          <span className="font-semibold">Edad:</span> {goal.edad ?? '—'} años
        </div>
        <div>
          <span className="font-semibold">Grasa Corporal:</span>{' '}
          {goal.grasa_corporal ?? '—'} %
        </div>
        <div>
          <span className="font-semibold">Cintura:</span>{' '}
          {goal.cintura_cm ?? '—'} cm
        </div>
        <div>
          <span className="font-semibold">IMC:</span> {goal.imc ?? '—'}
        </div>
        <div className="col-span-2">
          <span className="font-semibold">Control Antropométrico:</span>{' '}
          {goal.control_antropometrico ?? '—'}
        </div>
      </div>

      {/* Fechas */}
      <div className="text-xs text-gray-400 text-right">
        <div>Creado: {new Date(goal.created_at).toLocaleString()}</div>
        <div>Actualizado: {new Date(goal.updated_at).toLocaleString()}</div>
      </div>
    </div>
  );
};

export default StudentMonthlyGoalDetail;
