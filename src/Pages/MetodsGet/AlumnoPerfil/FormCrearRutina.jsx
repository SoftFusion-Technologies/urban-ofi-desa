import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Modal from '../../../Components/Modal'; // Asegúrate de importar tu Modal actualizado

const FormCrearRutina = () => {
  const { id: studentId } = useParams();
  const [fecha, setFecha] = useState('');
  const [ejercicios, setEjercicios] = useState([
    { musculo: '', descripcion: '', orden: 1 }
  ]);
  const [modalSuccess, setModalSuccess] = useState(false);

  const URL = 'http://localhost:8080/';

  const handleAgregarEjercicio = () => {
    if (ejercicios.length >= 10) return; // Límite de 10 ejercicios
    setEjercicios([
      ...ejercicios,
      { musculo: '', descripcion: '', orden: ejercicios.length + 1 }
    ]);
  };

  const handleEjercicioChange = (index, campo, valor) => {
    const nuevos = [...ejercicios];
    nuevos[index][campo] = valor;
    setEjercicios(nuevos);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Obtener mes y anio desde la fecha seleccionada
      const fechaObj = new Date(fecha);
      const mes = fechaObj.getMonth() + 1;
      const anio = fechaObj.getFullYear();

      // 1. Crear rutina
      const rutinaResponse = await axios.post(`${URL}routines`, {
        student_id: parseInt(studentId),
        mes,
        anio,
        fecha
      });

      const routine_id = rutinaResponse.data.id;

      if (!routine_id) {
        throw new Error('No se recibió el ID de la rutina creada');
      }

      // 2. Armar ejercicios para enviar
      const ejerciciosParaEnviar = ejercicios.map((ej) => ({
        routine_id,
        musculo: ej.musculo,
        descripcion: ej.descripcion,
        orden: ej.orden
      }));

      // 3. Enviar ejercicios asociados
      await axios.post(`${URL}routine_exercises`, ejerciciosParaEnviar);

      setModalSuccess(true); // Mostrar modal de éxito

      // Limpiar campos
      setFecha(''); // o valor inicial que uses
      setEjercicios([]); // vaciar array de ejercicios
    } catch (error) {
      console.error(error);
      alert('Error al crear la rutina: ' + error.message);
    }
  };

  return (
    <div className="p-4 sm:p-6 bg-white shadow-lg rounded-lg max-w-3xl mx-auto mt-6 w-full">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center">
        Crear Rutina
      </h2>

      <form onSubmit={handleSubmit}>
        <label className="block mb-2 font-medium">Fecha de rutina</label>
        <input
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 mb-4 w-full"
        />

        <div className="max-h-[400px] overflow-y-auto pr-2">
          {ejercicios.map((ej, index) => (
            <div key={index} className="mb-4 border-b pb-4">
              <label className="block font-medium">Músculo</label>
              <input
                type="text"
                value={ej.musculo}
                onChange={(e) =>
                  handleEjercicioChange(index, 'musculo', e.target.value)
                }
                className="border border-gray-300 rounded px-3 py-1 w-full mb-2"
              />

              <label className="block font-medium">
                Descripción del ejercicio
              </label>
              <textarea
                value={ej.descripcion}
                onChange={(e) =>
                  handleEjercicioChange(index, 'descripcion', e.target.value)
                }
                className="border border-gray-300 rounded px-3 py-1 w-full"
                rows={3}
              />
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={handleAgregarEjercicio}
          className="mb-4 bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded w-full sm:w-auto"
          disabled={ejercicios.length >= 10}
        >
          + Agregar ejercicio
        </button>

        <button
          type="submit"
          className="block bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded font-semibold w-full sm:w-auto"
        >
          Guardar rutina
        </button>
      </form>

      {/* Modal de Éxito */}
      {modalSuccess && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={() => setModalSuccess(false)}
        >
          <div
            className="bg-white rounded-lg shadow-xl max-w-sm w-full p-6 text-center transform transition-all scale-100 animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
            style={{ animationDuration: '300ms' }}
          >
            <svg
              className="mx-auto mb-4 h-12 w-12 text-green-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <h3 className="mb-2 text-lg font-semibold text-gray-900">
              ¡Rutina creada!
            </h3>
            <p className="mb-6 text-gray-600">
              La rutina fue guardada correctamente para el alumno seleccionado.
            </p>
            <button
              onClick={() => setModalSuccess(false)}
              className="inline-block px-5 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md transition"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormCrearRutina;
