import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../../AuthContext';

const diasSemana = [
  'Domingo',
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado'
];

// Función que parsea una fecha en formato YYYY-MM-DD a Date local
function parseFechaSinZona(fechaStr) {
  const [anio, mes, dia] = fechaStr.split('-').map(Number);
  return new Date(anio, mes - 1, dia); // mes es 0-based
}

function ListaRutinas({ studentId }) {
  const [editando, setEditando] = useState(null);
  const [textoEditado, setTextoEditado] = useState('');
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [rutinas, setRutinas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userLevel } = useAuth();
  const URL = 'http://localhost:8080/routines/';

  const hoy = new Date();
  const nombreDiaHoy = diasSemana[hoy.getDay()];

  useEffect(() => {
    const fetchRutinas = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/routines?student_id=${studentId}`
        );
        setRutinas(res.data);
      } catch (err) {
        setError('Error al cargar rutinas');
      } finally {
        setLoading(false);
      }
    };
    fetchRutinas();
  }, [studentId]);

  if (loading) return <p>Cargando rutinas...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  // Filtrar rutinas para hoy
  const rutinasHoy = rutinas.filter((rutina) => {
    const fechaRutina = parseFechaSinZona(rutina.fecha);
    return (
      fechaRutina.getFullYear() === hoy.getFullYear() &&
      fechaRutina.getMonth() === hoy.getMonth() &&
      fechaRutina.getDate() === hoy.getDate()
    );
  });

  // Agrupar ejercicios por músculo
  const ejerciciosPorMusculo = {};
  rutinasHoy.forEach((rutina) => {
    rutina.exercises?.forEach((ej) => {
      if (!ejerciciosPorMusculo[ej.musculo]) {
        ejerciciosPorMusculo[ej.musculo] = [];
      }
      ejerciciosPorMusculo[ej.musculo].push(ej.descripcion);
    });
  });

  function limpiarBusqueda(texto) {
    // Quita repeticiones al principio (ej: 4 x 10, 4X20, etc)
    let limpio = texto.replace(/^\d+\s?[xX]\s?\d+\s*/, '');

    // Quita números separados por guiones (ej: 25-20-15-12-10-8)
    limpio = limpio.replace(/(\d+(-\d+)+)/g, '');

    // Quita números sueltos que no sean parte de palabras
    limpio = limpio.replace(/\b\d+\b/g, '');

    // Limpia espacios extras
    limpio = limpio.trim();

    return limpio;
  }

  const handleGuardarEdicion = async (
    routineId,
    exerciseId,
    lineaIndex,
    textoEditado
  ) => {
    try {
      setLoadingEdit(true);

      // Encontrar la rutina y el ejercicio actual
      const rutina = rutinas.find((r) => r.id === routineId);
      if (!rutina) throw new Error('Rutina no encontrada');

      const ejercicio = rutina.exercises.find((ej) => ej.id === exerciseId);
      if (!ejercicio) throw new Error('Ejercicio no encontrado');

      // Dividir la descripción actual en líneas
      const lineas = ejercicio.descripcion.split(/\n|(?=\d+\s?[xX]\s?\d+)/g);

      // Comprobar si el texto editado es igual a la línea original
      if (lineas[lineaIndex] === textoEditado.trim()) {
        // No hubo cambios, salir del modo edición y no hacer nada
        setEditando(null);
        setLoadingEdit(false);
        return;
      }

      // Reemplazar solo la línea editada por el texto nuevo
      lineas[lineaIndex] = textoEditado;

      // Volver a unir todas las líneas en una sola descripción
      const descripcionActualizada = lineas.join('\n').trim();

      // Llamar a la API con la descripción completa actualizada
      await axios.put(
        `http://localhost:8080/routines/${routineId}/routines_exercises/${exerciseId}`,
        { descripcion: descripcionActualizada }
      );

      // Actualizar el estado local
      setRutinas((prevRutinas) =>
        prevRutinas.map((rutina) => {
          if (rutina.id === routineId) {
            return {
              ...rutina,
              exercises: rutina.exercises.map((ej) => {
                if (ej.id === exerciseId) {
                  return { ...ej, descripcion: descripcionActualizada };
                }
                return ej;
              })
            };
          }
          return rutina;
        })
      );

      setEditando(null);
    } catch (error) {
      alert('Error al guardar la edición');
    } finally {
      setLoadingEdit(false);
    }
  };

  const handleEliminarLinea = async (routineId, exerciseId, lineaIndex) => {
    try {
      setLoading(true);

      // Buscar la rutina y ejercicio
      const rutina = rutinas.find((r) => r.id === routineId);
      if (!rutina) throw new Error('Rutina no encontrada');

      const ejercicio = rutina.exercises.find((ej) => ej.id === exerciseId);
      if (!ejercicio) throw new Error('Ejercicio no encontrado');

      // Dividir la descripción en líneas o valores (por espacio o salto de línea)
      let lineas = ejercicio.descripcion.split(/\n|(?=\d+\s?[xX]\s?\d+)/g);

      // Eliminar la línea (valor) por índice
      lineas.splice(lineaIndex, 1);

      // Volver a unir la descripción
      const descripcionActualizada = lineas.join(' ').trim();

      // Actualizar la descripción en backend (PUT)
      await axios.put(
        `http://localhost:8080/routines/${routineId}/routines_exercises/${exerciseId}`,
        { descripcion: descripcionActualizada }
      );

      // Actualizar estado local
      setRutinas((prevRutinas) =>
        prevRutinas.map((rutina) => {
          if (rutina.id === routineId) {
            return {
              ...rutina,
              exercises: rutina.exercises.map((ej) => {
                if (ej.id === exerciseId) {
                  return { ...ej, descripcion: descripcionActualizada };
                }
                return ej;
              })
            };
          }
          return rutina;
        })
      );
    } catch (error) {
      alert('Error al eliminar la línea');
    } finally {
      setLoading(false);
    }
  };

  const handleEliminarMusculo = async (routineId, musculo) => {
    if (
      !window.confirm(
        `¿Eliminar todos los ejercicios del músculo "${musculo}"?`
      )
    )
      return;

    try {
      const res = await axios.delete(`${URL}${routineId}/${musculo}`);
      alert(res.data.message);
    } catch (err) {
      console.error(err);
      alert('Error al eliminar ejercicios del músculo.');
    }
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg max-w-2xl mx-auto">
      <h2 className="titulo text-4xl font-bold mb-6 text-center text-gray-800">
        {nombreDiaHoy.toUpperCase()}
      </h2>

      {rutinasHoy.length === 0 ? (
        <p className="text-center text-gray-500">
          No hay rutinas cargadas para hoy
        </p>
      ) : (
        <div className="space-y-6">
          {rutinasHoy.map((rutina) => {
            // Para agrupar ejercicios por músculo dentro de cada rutina
            const ejerciciosPorMusculo = {};
            rutina.exercises?.forEach((ej) => {
              if (!ejerciciosPorMusculo[ej.musculo]) {
                ejerciciosPorMusculo[ej.musculo] = [];
              }
              ejerciciosPorMusculo[ej.musculo].push(ej);
            });

            return (
              <div key={rutina.id}>
                {Object.entries(ejerciciosPorMusculo).map(
                  ([musculo, ejercicios]) => (
                    <div
                      key={musculo}
                      className="bg-white p-4 rounded shadow mb-6"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-bold text-lg text-indigo-600">
                          {musculo.toUpperCase()}
                        </h3>

                        {(userLevel === 'admin' ||
                          userLevel === 'instructor') && (
                          <button
                            onClick={() =>
                              handleEliminarMusculo(rutina.id, musculo)
                            }
                            className="bg-red-100 text-red-700 hover:bg-red-200 px-2 py-1 rounded text-xs font-medium"
                          >
                            🗑️ Eliminar grupo
                          </button>
                        )}
                      </div>
                      <ul className="list-disc list-inside space-y-1 text-sm text-gray-800">
                        {ejercicios.map((ej) =>
                          ej.descripcion
                            .split(/\n|(?=\d+\s?[xX]\s?\d+)/g)
                            .map((linea, idx) => {
                              const ejercicio = linea.trim();
                              if (!ejercicio) return null;

                              // Para editar, guardamos el texto completo del ejercicio
                              // Si el ejercicio está en edición, mostramos input, sino texto + botones
                              const esEditando =
                                editando &&
                                editando.routineId === rutina.id &&
                                editando.exerciseId === ej.id &&
                                editando.lineaIndex === idx;

                              // Limpiar texto para búsqueda (solo si no está editando)
                              let busqueda = limpiarBusqueda(ejercicio);
                              if (busqueda.split(' ').length < 3) {
                                busqueda = musculo + ' ' + busqueda;
                              }

                              return (
                                <li
                                  key={idx}
                                  className="flex justify-between items-center"
                                >
                                  {esEditando ? (
                                    <input
                                      type="text"
                                      value={textoEditado}
                                      autoFocus
                                      onChange={(e) =>
                                        setTextoEditado(e.target.value)
                                      }
                                      onBlur={() =>
                                        handleGuardarEdicion(
                                          rutina.id,
                                          ej.id,
                                          idx,
                                          textoEditado
                                        )
                                      }
                                      onKeyDown={(e) => {
                                        if (e.key === 'Enter') e.target.blur();
                                      }}
                                      className="border rounded px-2 py-1 flex-grow"
                                    />
                                  ) : (
                                    <>
                                      <span>{ejercicio}</span>
                                      <div className="flex space-x-4">
                                        <button
                                          onClick={() =>
                                            window.open(
                                              `https://www.youtube.com/results?search_query=${encodeURIComponent(
                                                busqueda
                                              )}`,
                                              '_blank'
                                            )
                                          }
                                          className="text-blue-600 hover:underline"
                                        >
                                          Ver video
                                        </button>
                                        {(userLevel === 'admin' ||
                                          userLevel === 'instructor') && (
                                          <>
                                            <button
                                              onClick={() => {
                                                setEditando({
                                                  routineId: rutina.id,
                                                  exerciseId: ej.id,
                                                  lineaIndex: idx
                                                });
                                                setTextoEditado(ejercicio);
                                              }}
                                              className="text-yellow-600 hover:underline"
                                            >
                                              Editar
                                            </button>
                                            <button
                                              className="text-red-600 hover:underline"
                                              onClick={() =>
                                                handleEliminarLinea(
                                                  rutina.id,
                                                  ej.id,
                                                  idx
                                                )
                                              }
                                            >
                                              Eliminar
                                            </button>
                                          </>
                                        )}
                                      </div>
                                    </>
                                  )}
                                </li>
                              );
                            })
                        )}
                      </ul>
                    </div>
                  )
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ListaRutinas;
