import { motion } from 'framer-motion';
import { useState } from 'react';
import { GiWeightLiftingUp, GiStrong, GiMuscleUp } from 'react-icons/gi';
import { MdOutlineFitnessCenter } from 'react-icons/md';
import { FiTrendingUp } from 'react-icons/fi';
import HistorialRMModal from './HistorialRMModal';

// Íconos por ejercicio
const getIcon = (ejercicio) => {
  const e = ejercicio.toLowerCase();
  if (e.includes('press'))
    return <MdOutlineFitnessCenter className="text-3xl text-white" />;
  if (e.includes('sentadilla'))
    return <GiWeightLiftingUp className="text-3xl text-white" />;
  if (e.includes('dominadas'))
    return <GiMuscleUp className="text-3xl text-white" />;
  return <GiStrong className="text-3xl text-white" />;
};

// Gradiente por ejercicio
const getColorClass = (ejercicio) => {
  const e = ejercicio.toLowerCase();
  if (e.includes('sentadilla')) return 'from-pink-600 to-red-600';
  if (e.includes('press')) return 'from-indigo-600 to-purple-600';
  if (e.includes('peso muerto')) return 'from-yellow-500 to-orange-500';
  return 'from-sky-600 to-teal-600';
};

// RM destacada
const isPR = (rm) => rm.rm_estimada && rm.rm_estimada > 100;

export const RMCard = ({ ejercicio, registros, studentId }) => {
  const [mostrarTodos, setMostrarTodos] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [historialActual, setHistorialActual] = useState([]);
  const [ejercicioActual, setEjercicioActual] = useState('');

  const visibles = mostrarTodos ? registros : registros.slice(0, 4);

  const handleVerHistorial = async (ejercicio) => {
    const res = await fetch(
      `http://localhost:8080/rm-historial?student_id=${studentId}&ejercicio=${encodeURIComponent(
        ejercicio
      )}`
    );
    const data = await res.json();
    setHistorialActual(data);
    setEjercicioActual(ejercicio);
    setModalOpen(true);
  };

  return (
    <div className="mb-16">
      {/* Título del ejercicio */}
      <h2 className="text-2xl font-bold text-white uppercase tracking-wide mb-6 flex items-center gap-2">
        {getIcon(ejercicio)}
        {ejercicio}
        <span className="text-white/60 text-sm">({registros.length})</span>
      </h2>

      {/* Grilla de 4 columnas en desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {visibles.map((rm) => {
          const badge = isPR(rm) ? (
            <span className="absolute top-2 right-2 bg-green-500 text-white px-2 py-0.5 text-xs rounded-full shadow">
              🔥 Nuevo PR
            </span>
          ) : null;

          return (
            <motion.div
              key={rm.id}
              className={`relative rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br ${getColorClass(
                rm.ejercicio
              )} text-white`}
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 100 }}
            >
              {badge}

              <div className="backdrop-blur-sm bg-white/10 p-6 min-h-[300px] h-full flex flex-col justify-between">
                <div className="flex justify-between items-center mb-2">
                  <div>{getIcon(rm.ejercicio)}</div>
                  <span className="text-xs text-white/80">
                    {new Date(rm.fecha).toLocaleDateString()}
                  </span>
                </div>

                <h3 className="text-lg font-bold capitalize">{rm.ejercicio}</h3>

                <div className="mt-2 space-y-1 text-sm">
                  <p>
                    <span className="font-semibold">Peso:</span>{' '}
                    {rm.peso_levantado} kg
                  </p>
                  <p>
                    <span className="font-semibold">Reps:</span>{' '}
                    {rm.repeticiones}
                  </p>
                  <p>
                    <span className="font-semibold">RM Estimado:</span>{' '}
                    {rm.rm_estimada ? `${rm.rm_estimada} kg` : '-'}
                  </p>
                </div>

                {rm.comentario && (
                  <p className="mt-3 italic text-white/80 border-t border-white/20 pt-2 text-xs">
                    “{rm.comentario}”
                  </p>
                )}

                <div className="flex justify-between items-center mt-4">
                  <button
                    onClick={() => handleVerHistorial(rm.ejercicio)}
                    className="text-xs bg-white/20 px-3 py-1 rounded hover:bg-white/30 transition"
                  >
                    Ver Historial
                  </button>
                  <FiTrendingUp className="text-white/80" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Botón Ver más */}
      {registros.length > 4 && (
        <div className="text-center mt-6">
          <button
            onClick={() => setMostrarTodos(!mostrarTodos)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-4 py-2 rounded-full shadow-md transition-all duration-300"
          >
            {mostrarTodos ? 'Ver menos' : 'Ver más'}
          </button>
        </div>
      )}

      {/* Modal */}
      <HistorialRMModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        historial={historialActual}
        ejercicio={ejercicioActual}
      />
    </div>
  );
};
