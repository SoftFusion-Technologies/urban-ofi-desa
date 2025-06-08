import React, { useEffect, useState } from 'react';

function EstadisticasAlumno({ studentId }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Estados para cada estadística
  const [rutinas, setRutinas] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [solicitudes, setSolicitudes] = useState(null);
  const [metasProgresos, setMetasProgresos] = useState(null);
  const [ranking, setRanking] = useState(null);

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
      fetch(
        `${URL}/feedback-alumno?student_id=${studentId}&mes=${mesActual}&anio=${anioActual}`
      ).then((res) => {
        if (!res.ok) throw new Error('Error al cargar feedback');
        return res.json();
      }),
      fetch(
        `${URL}/solicitudes-por-alumno?student_id=${studentId}&mes=${mesActual}&anio=${anioActual}`
      ).then((res) => {
        if (!res.ok) throw new Error('Error al cargar solicitudes');
        return res.json();
      }),
      fetch(
        `${URL}/metas-progresos?student_id=${studentId}&mes=${mesActual}&anio=${anioActual}`
      ).then((res) => {
        if (!res.ok) throw new Error('Error al cargar metas y progresos');
        return res.json();
      }),
      fetch(`${URL}/ranking-activos?mes=${mesActual}&anio=${anioActual}`).then(
        (res) => {
          if (!res.ok) throw new Error('Error al cargar ranking');
          return res.json();
        }
      )
    ])
      .then(
        ([
          rutinasData,
          feedbackData,
          solicitudesData,
          metasProgresosData,
          rankingData
        ]) => {
          setRutinas(rutinasData);
          setFeedback(feedbackData);
          setSolicitudes(solicitudesData);
          setMetasProgresos(metasProgresosData);
          setRanking(rankingData);
          setLoading(false);
        }
      )
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [studentId, mesActual, anioActual]);

  if (loading)
    return <div className="text-center p-4">Cargando estadísticas...</div>;

  if (error) return <div className="text-center text-red-600 p-4">{error}</div>;

  if (!rutinas || !feedback || !solicitudes || !metasProgresos || !ranking)
    return null;

  // Rutinas porcentaje
  const porcentajeCompletadas =
    rutinas.total_rutinas_cargadas === 0
      ? 0
      : Math.round(
          (rutinas.total_rutinas_completadas / rutinas.total_rutinas_cargadas) *
            100
        );

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 mt-6 space-y-8">
      {/* Rutinas */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Estadísticas de Rutinas
        </h2>
        <div className="flex justify-between items-center mb-4">
          <div className="text-center">
            <p className="text-gray-600">Rutinas Cargadas</p>
            <p className="text-3xl font-extrabold text-blue-600">
              {rutinas.total_rutinas_cargadas}
            </p>
          </div>
          <div className="text-center">
            <p className="text-gray-600">Rutinas Completadas</p>
            <p className="text-3xl font-extrabold text-green-600">
              {rutinas.total_rutinas_completadas}
            </p>
          </div>
        </div>
        <div className="mb-2 text-center text-gray-700">
          <span className="font-semibold">{porcentajeCompletadas}%</span>{' '}
          Completadas
        </div>
        <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden shadow-inner">
          <div
            className="bg-green-500 h-6 transition-all duration-500"
            style={{ width: `${porcentajeCompletadas}%` }}
            aria-label={`${porcentajeCompletadas}% de rutinas completadas`}
          />
        </div>
      </section>

      {/* Feedback */}
      <section>
        <h2 className="text-xl font-bold mb-2 text-gray-800">
          Feedback del alumno
        </h2>
        <p>
          Dificultad promedio:{' '}
          {feedback.dificultad_promedio?.toFixed(2) || 'N/A'}
        </p>
        <p>
          Porcentaje de gusto: {feedback.porcentaje_gusto?.toFixed(1) || 'N/A'}%
        </p>
      </section>

      {/* Solicitudes */}
      <section>
        <h2 className="text-xl font-bold mb-2 text-gray-800">
          Solicitudes de ayuda
        </h2>
        {solicitudes.length === 0 && <p>No hay solicitudes registradas</p>}
        <ul>
          {solicitudes.map(({ estado, total_solicitudes }) => (
            <li key={estado}>
              <strong>{estado}:</strong> {total_solicitudes}
            </li>
          ))}
        </ul>
      </section>

      {/* Metas y progresos */}
      <section>
        <h2 className="text-xl font-bold mb-2 text-gray-800">
          Metas y progreso antropométrico
        </h2>
        {metasProgresos.meta ? (
          <>
            <p>
              <strong>Objetivo:</strong> {metasProgresos.meta.objetivo}
            </p>
            <p>
              <strong>Estado:</strong> {metasProgresos.meta.estado}
            </p>
            <p>
              <strong>Altura:</strong> {metasProgresos.meta.altura_cm} cm
            </p>
            <p>
              <strong>Peso:</strong> {metasProgresos.meta.peso_kg} kg
            </p>
            <p>
              <strong>Edad:</strong> {metasProgresos.meta.edad}
            </p>
            <p>
              <strong>Grasa corporal:</strong>{' '}
              {metasProgresos.meta.grasa_corporal}
            </p>
            <p>
              <strong>Cintura:</strong> {metasProgresos.meta.cintura_cm} cm
            </p>
            <p>
              <strong>IMC:</strong> {metasProgresos.meta.imc}
            </p>
            <p>
              <strong>Control antropométrico:</strong>{' '}
              {metasProgresos.meta.control_antropometrico}
            </p>
          </>
        ) : (
          <p>No hay metas registradas para este mes.</p>
        )}

        {metasProgresos.progreso ? (
          <>
            <h3 className="mt-4 font-semibold">Último progreso</h3>
            <p>
              <strong>Peso:</strong> {metasProgresos.progreso.peso_kg} kg
            </p>
            <p>
              <strong>Altura:</strong> {metasProgresos.progreso.altura_cm} cm
            </p>
            <p>
              <strong>Grasa corporal:</strong>{' '}
              {metasProgresos.progreso.grasa_corporal}
            </p>
            <p>
              <strong>Cintura:</strong> {metasProgresos.progreso.cintura_cm} cm
            </p>
            <p>
              <strong>IMC:</strong> {metasProgresos.progreso.imc}
            </p>
            <p>
              <strong>Comentario:</strong> {metasProgresos.progreso.comentario}
            </p>
            <p>
              <strong>Fecha:</strong>{' '}
              {new Date(metasProgresos.progreso.fecha).toLocaleDateString()}
            </p>
          </>
        ) : (
          <p>No hay progresos registrados para este mes.</p>
        )}
      </section>

      {/* Ranking */}
      <section>
        <h2 className="text-xl font-bold mb-2 text-gray-800">
          Ranking alumnos más activos
        </h2>
        <ol className="list-decimal list-inside">
          {ranking.map(
            ({
              student_id,
              nomyape,
              rutinas_asignadas,
              rutinas_completadas
            }) => (
              <li key={student_id} className="mb-1">
                {nomyape} — Rutinas asignadas: {rutinas_asignadas}, completadas:{' '}
                {rutinas_completadas}
              </li>
            )
          )}
        </ol>
      </section>
    </div>
  );
}

export default EstadisticasAlumno;
