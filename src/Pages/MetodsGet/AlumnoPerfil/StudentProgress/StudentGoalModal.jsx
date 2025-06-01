import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ParticlesBackground from '../../../../Components/ParticlesBackground';

const StudentGoalModal = ({ studentId }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [goal, setGoal] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const URL = 'http://localhost:8080';

  useEffect(() => {
    if (!studentId) return;

    const fetchGoal = async () => {
      setLoading(true);
      try {
        // Consulta si tiene objetivo para el mes y año actuales
        const now = new Date();
        const month = now.getMonth() + 1; // Enero = 0
        const year = now.getFullYear();

        const res = await axios.get(
          `${URL}/student-monthly-goals?student_id=${studentId}&month=${month}&year=${year}`
        );

        // Si no hay objetivos para este mes, abrir modal
        if (!res.data || res.data.length === 0) {
          setModalOpen(true);
        }
      } catch (error) {
        console.error('Error al consultar objetivo mensual:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGoal();
  }, [studentId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!goal.trim()) return alert('Por favor, ingrese un objetivo válido.');

    setSaving(true);
    try {
      const now = new Date();
      const month = now.getMonth() + 1;
      const year = now.getFullYear();

      await axios.post(`${URL}/student-monthly-goals`, {
        student_id: studentId,
        objetivo: goal,
        mes: month,
        anio: year
      });

      setModalOpen(false);
      setGoal('');
      alert('Objetivo guardado correctamente.');
    } catch (error) {
      console.error('Error al guardar objetivo mensual:', error);
      alert('Error al guardar el objetivo, intente nuevamente.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return null;

  return (
    <>
      {modalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4">
          <ParticlesBackground></ParticlesBackground>
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-8 relative">
            {/* Botón cerrar */}
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition"
              aria-label="Cerrar modal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <h2 className="titulo uppercase text-2xl font-semibold mb-6 text-center text-gray-800">
              Definir Objetivo Mensual
            </h2>

            <div className="flex items-start gap-4 mb-6">
              {/* Icono info */}
              <div className="flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 16h-1v-4h-1m1-4h.01M12 18a6 6 0 100-12 6 6 0 000 12z"
                  />
                </svg>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Define un objetivo claro y alcanzable para este mes. Esto te
                ayudará a mantener el foco y medir tus avances. Por ejemplo:
                "Perder 3 kilos", "Correr 5 km tres veces por semana", o
                "Mejorar mi alimentación".
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <textarea
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                placeholder="Escribe tu objetivo para este mes..."
                rows={5}
                className="w-full border border-gray-300 rounded-lg p-4 resize-none shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent mb-6 transition"
                required
              />

              <button
                type="submit"
                disabled={saving}
                className={`w-full py-3 rounded-lg text-white font-semibold transition ${
                  saving
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {saving ? 'Guardando...' : 'Guardar Objetivo'}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default StudentGoalModal;
