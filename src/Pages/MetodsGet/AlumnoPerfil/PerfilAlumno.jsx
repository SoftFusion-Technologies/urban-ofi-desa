import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  FaPhone,
  FaIdCard,
  FaBullseye,
  FaCalendarAlt,
  FaEdit,
  FaChalkboardTeacher
} from 'react-icons/fa';
import NavbarStaff from '../../staff/NavbarStaff';
import ParticlesBackground from '../../../Components/ParticlesBackground';
import axios from 'axios';
import { useAuth } from '../../../AuthContext';
import Modal from '../../../Components/Modal';
import FormCrearRutina from '../AlumnoPerfil/FormCrearRutina';
import ListaRutinas from './ListaRutinas';
import ProtectedRoutine from './ProtectedRoutine';

function PerfilAlumno() {
  const { id } = useParams();
  const [alumno, setAlumno] = useState(null);
  const [usuarios, setUsuarios] = useState([]);
  const [rutinas, setRutinas] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [mostrarCrearRutina, setMostrarCrearRutina] = useState(false);
  const [mostrarProgramarRutina, setMostrarProgramarRutina] = useState(false);
  const { userLevel } = useAuth();

  // Fetch alumno por id
  useEffect(() => {
    async function fetchAlumno() {
      try {
        const res = await fetch(`http://localhost:8080/students/${id}`);
        if (!res.ok) throw new Error('Error al cargar el perfil');
        const data = await res.json();
        setAlumno(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchAlumno();
  }, [id]);

  // Fetch usuarios (instructores) una vez
  useEffect(() => {
    const obtenerUsuarios = async () => {
      try {
        const res = await axios.get('http://localhost:8080/users');
        const instructores = res.data.filter(
          (user) => user.level === 'instructor'
        );
        setUsuarios(instructores);
      } catch (error) {
        console.log('Error al obtener profesores:', error);
      }
    };
    obtenerUsuarios();
  }, []); // solo se ejecuta una vez

  const obtenerNombreProfesor = (userId) => {
    const profesor = usuarios.find((u) => u.id === userId);
    return profesor ? profesor.name : 'Sin asignar';
  };

  if (loading) {
    return (
      <>
        <NavbarStaff />
        <p className="text-center mt-8 text-gray-600">Cargando perfil...</p>
      </>
    );
  }

  if (error) {
    return (
      <>
        <NavbarStaff />
        <p className="text-center mt-8 text-red-600">Error: {error}</p>
      </>
    );
  }

  if (!alumno) {
    return (
      <>
        <NavbarStaff />
        <p className="text-center mt-8 text-gray-600">
          No se encontró el alumno.
        </p>
      </>
    );
  }

  // Si llegamos aquí, alumno ya está cargado y no es null
  return (
    <>
      <NavbarStaff />

      <div className="bg-gradient-to-b from-blue-950 via-blue-900 to-blue-800 min-h-screen pt-10 pb-10">
        <ParticlesBackground />

        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-start md:gap-6">
            {/* Perfil Alumno (card fija) */}
            <div className="w-full md:max-w-md mx-auto md:mx-0 bg-white shadow-xl rounded-xl p-8 mt-10">
              <div className="flex justify-center relative">
                <div className="relative">
                  <img
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                      alumno.nomyape
                    )}&background=4ade80&color=fff&size=128`}
                    alt="Avatar Alumno"
                    className="w-32 h-32 rounded-full object-cover border-4 border-green-400"
                  />
                  <button
                    className="absolute bottom-0 right-0 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 border-2 border-white shadow-lg"
                    title="Editar imagen (próximamente)"
                    disabled
                  >
                    <FaEdit size={18} />
                  </button>
                </div>
              </div>

              <h2 className="text-3xl font-extrabold text-center mt-6 mb-4 text-gray-800">
                {alumno.nomyape}
              </h2>

              {(userLevel === 'admin' || userLevel === 'instructor') && (
                <div className="mt-6 mb-6 flex flex-col sm:flex-row justify-around gap-4">
                  <button
                    onClick={() => {
                      setMostrarCrearRutina(true);
                      setMostrarProgramarRutina(false);
                    }}
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Crear rutina
                  </button>
                  <button
                    onClick={() => {
                      setMostrarProgramarRutina(true);
                      setMostrarCrearRutina(false);
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Programar rutina
                  </button>
                </div>
              )}

              <div className="space-y-4 text-gray-700 text-lg">
                <p className="flex items-center gap-3">
                  <FaChalkboardTeacher className="text-blue-500" />
                  <span>
                    <strong>Profesor:</strong>{' '}
                    {obtenerNombreProfesor(alumno.user_id) || 'No disponible'}
                  </span>
                </p>
                <p className="flex items-center gap-3">
                  <FaPhone className="text-blue-500" />
                  <span>
                    <strong>Teléfono:</strong>{' '}
                    {alumno.telefono || 'No disponible'}
                  </span>
                </p>
                <p className="flex items-center gap-3">
                  <FaIdCard className="text-blue-500" />
                  <span>
                    <strong>DNI:</strong> {alumno.dni || 'No disponible'}
                  </span>
                </p>
                <p className="flex items-center gap-3">
                  <FaBullseye className="text-blue-500" />
                  <span>
                    <strong>Objetivo:</strong>{' '}
                    {alumno.objetivo || 'No especificado'}
                  </span>
                </p>
                <p className="flex items-center gap-3 text-sm text-gray-500 justify-center">
                  <FaCalendarAlt />
                  <span>
                    Creado:{' '}
                    {alumno.created_at
                      ? new Date(alumno.created_at).toLocaleDateString()
                      : 'N/A'}
                  </span>
                </p>
                <p className="flex items-center gap-3 text-sm text-gray-500 justify-center">
                  <FaCalendarAlt />
                  <span>
                    Actualizado:{' '}
                    {alumno.updated_at
                      ? new Date(alumno.updated_at).toLocaleDateString()
                      : 'N/A'}
                  </span>
                </p>
              </div>
            </div>

            {/* Rutinas (ocupa el resto del espacio) */}
            <div className="flex-1 mt-10">
              <ProtectedRoutine>
                <ListaRutinas studentId={id} />
              </ProtectedRoutine>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={mostrarCrearRutina}
        title="Crear nueva rutina"
        onCancel={() => setMostrarCrearRutina(false)}
        colorIcon="green"
      >
        <FormCrearRutina onClose={() => setMostrarCrearRutina(false)} />
      </Modal>
    </>
  );
}

export default PerfilAlumno;
