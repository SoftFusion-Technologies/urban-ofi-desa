import { useEffect, useState } from 'react';

const FeedbackList = ({ instructorId }) => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      setLoading(true);
      setError(null);
      try {
        // Incluyo instructorId en la query string para filtrar
        const url = `http://localhost:8080/routine-feedbacks?instructor_id=${instructorId}`;

        const res = await fetch(url, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!res.ok) throw new Error('Error al cargar los feedbacks');

        const data = await res.json();
        setFeedbacks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (instructorId) {
      fetchFeedbacks();
    }
  }, [instructorId]);

  if (loading) return <p>Cargando feedbacks...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (feedbacks.length === 0) return <p>No hay feedbacks para mostrar.</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">Feedbacks de Rutinas</h2>
      <div className="flex flex-wrap gap-6">
        {feedbacks.map((fb) => (
          <div
            key={fb.feedback_id}
            className="bg-white rounded-lg shadow-md border border-gray-200 p-5 flex flex-col w-full sm:w-[45%] md:w-[30%]"
          >
            <div className="mb-2 text-sm text-gray-500">
              <strong>Fecha Rutina:</strong>{' '}
              {new Date(fb.rutina.fecha).toLocaleDateString()}
            </div>
            <div className="mb-2">
              <strong>Alumno:</strong> {fb.alumno}
            </div>
            <div className="mb-2">
              <strong>Gusto:</strong> {fb.gusto ? 'Sí' : 'No'}
            </div>
            <div className="mb-2">
              <strong>Dificultad:</strong> {fb.dificultad}
            </div>
            <div className="mb-2">
              <strong>Comentario:</strong> {fb.comentario || '-'}
            </div>
            <div className="mb-2">
              <strong>Instructor:</strong> {fb.instructor}
            </div>
            <div className="mt-auto">
              <strong>Ejercicios:</strong>
              <ul className="list-disc list-inside mt-1 max-h-32 overflow-auto text-sm text-gray-700">
                {fb.rutina.exercises.length > 0 ? (
                  fb.rutina.exercises.map((ex) => (
                    <li key={ex.id}>
                      <span className="font-semibold">{ex.musculo}:</span>{' '}
                      {ex.descripcion
                        .trim()
                        .split('\n')
                        .map((line, i) => (
                          <p key={i}>{line}</p>
                        ))}
                    </li>
                  ))
                ) : (
                  <li>No hay ejercicios</li>
                )}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedbackList;
