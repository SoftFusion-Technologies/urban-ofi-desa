import React, { useEffect, useState } from 'react';

function EstadisticasAlumno({ studentId }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Estados para cada estadística
  const [rutinas, setRutinas] = useState(null);
  const [ranking, setRanking] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const today = new Date();
  const mesActual = today.getMonth() + 1;
  const anioActual = today.getFullYear();

  const URL = 'http://localhost:8080/estadisticas';

  useEffect(() => {
    if (!studentId) return;

    setLoading(true);
    setError(null);

    // Para paralelizar todas las llamadas
    Promise.all([
      fetch(
        `${URL}/rutinas-por-alumno?student_id=${studentId}&mes=${mesActual}&anio=${anioActual}`
      ).then((res) => {
        if (!res.ok) throw new Error('Error al cargar rutinas');
        return res.json();
      }),

      fetch(`${URL}/ranking-activos?mes=${mesActual}&anio=${anioActual}`).then(
        (res) => {
          if (!res.ok) throw new Error('Error al cargar ranking');
          return res.json();
        }
      )
    ])
      .then(([rutinasData, rankingData]) => {
        setRutinas(rutinasData);
        setRanking(rankingData);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [studentId, mesActual, anioActual]);

  if (loading)
    return <div className="text-center p-4">Cargando estadísticas...</div>;

  if (error) return <div className="text-center text-red-600 p-4">{error}</div>;

  if (!rutinas || !ranking) return null;

  // Rutinas porcentaje
  const porcentajeCompletadas =
    rutinas.total_rutinas_cargadas === 0
      ? 0
      : Math.round(
          (rutinas.total_rutinas_completadas / rutinas.total_rutinas_cargadas) *
            100
        );


  // Mostrar solo 2 alumnos si showAll es false
  const rankingToShow = showAll ? ranking : ranking.slice(0, 2);
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 mt-8 space-y-10">
      {/* Rutinas */}
      <section>
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Estadísticas de Rutinas
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-center">
          <div className="bg-blue-50 rounded-xl p-6 shadow-md">
            <p className="text-gray-600 mb-2">Rutinas Cargadas</p>
            <p className="text-4xl font-bold text-blue-600">
              {rutinas.total_rutinas_cargadas}
            </p>
          </div>
          <div className="bg-green-50 rounded-xl p-6 shadow-md">
            <p className="text-gray-600 mb-2">Rutinas Completadas</p>
            <p className="text-4xl font-bold text-green-600">
              {rutinas.total_rutinas_completadas}
            </p>
          </div>
        </div>

        <div className="mt-6 text-center text-gray-700 text-lg">
          <span className="font-semibold text-green-700">
            {porcentajeCompletadas}%
          </span>{' '}
          completadas
        </div>

        <div className="w-full bg-gray-200 rounded-full h-5 mt-2 overflow-hidden shadow-inner">
          <div
            className="bg-gradient-to-r from-green-400 to-green-600 h-5 transition-all duration-700"
            style={{ width: `${porcentajeCompletadas}%` }}
            aria-label={`${porcentajeCompletadas}% de rutinas completadas`}
          />
        </div>
      </section>

      {/* Ranking */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Ranking de Alumnos Más Activos
        </h2>
        <div className="bg-gray-50 rounded-lg shadow-inner p-4">
          <ol className="space-y-2">
            {rankingToShow.map(
              ({
                student_id,
                nomyape,
                rutinas_asignadas,
                rutinas_completadas
              }) => (
                <li
                  key={student_id}
                  className="flex justify-between items-center border-b border-gray-200 pb-2"
                >
                  <span className="font-medium text-gray-700">{nomyape}</span>
                  <span className="text-sm text-gray-600">
                    Asignadas: {rutinas_asignadas}, Completadas:{' '}
                    {rutinas_completadas}
                  </span>
                </li>
              )
            )}
          </ol>

          {ranking.length > 2 && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="mt-4 block mx-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition-colors"
            >
              {showAll ? 'Ver menos' : 'Ver más'}
            </button>
          )}
        </div>
      </section>
    </div>
  );
}

export default EstadisticasAlumno;
