import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import NavbarStaff from './NavbarStaff';
import '../../Styles/staff/dashboard.css';
import '../../Styles/staff/background.css';
// import Footer from '../../components/footer/Footer';
import { useAuth } from '../../AuthContext';
import ParticlesBackground from '../../Components/ParticlesBackground';

const AdminPage = () => {
  const [modalPreguntasOpen, setModalPreguntasOpen] = useState(false);
  const [modalDetalleOpen, setModalDetalleOpen] = useState(false);
  const [preguntas, setPreguntas] = useState([]);
  const [preguntaSeleccionada, setPreguntaSeleccionada] = useState(null);
  const URL = 'http://localhost:8080/ask/';

  const { userLevel } = useAuth();

  const abrirModalPreguntas = async () => {
    try {
      const response = await axios.get(URL);
      setPreguntas(response.data);
      setModalPreguntasOpen(true);
    } catch (error) {
      console.log('Error al obtener las preguntas:', error);
    }
  };

  const cerrarModalPreguntas = () => {
    setModalPreguntasOpen(false);
  };

  const abrirModalDetalle = (pregunta) => {
    setPreguntaSeleccionada(pregunta);
    setModalDetalleOpen(true);
  };

  const cerrarModalDetalle = () => {
    setModalDetalleOpen(false);
  };

  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (userLevel === 'instructor') {
      navigate('/dashboard/instructores/planilla');
    } else {
      navigate('/dashboard/instructores');
    }
  };
  return (
    <>
      {/* Navbar section */}
      <NavbarStaff />
      {/* Hero section*/}
      <section className="relative w-full h-contain mx-auto bg-white">
        <div className="bg-gradient-to-b from-blue-950 via-blue-900 to-blue-800">
          <ParticlesBackground></ParticlesBackground>
          <div className="titulo xl:px-0 sm:px-16 px-6 max-w-7xl mx-auto grid grid-cols-2 max-sm:grid-cols-1 max-md:gap-y-10 md:gap-10 py-28 sm:pt-44 lg:pt-28 md:w-5/6 ">
            {(userLevel === 'admin' ||
              userLevel === 'administrador' ||
              userLevel === 'gerente' ||
              userLevel === 'vendedor') && (
              <div className="bg-white font-bignoodle w-[250px] h-[100px] text-[20px] lg:w-[400px] lg:h-[150px] lg:text-[30px] mx-auto flex justify-center items-center rounded-tr-xl rounded-bl-xl">
                <Link to="/dashboard/novedades">
                  <button className="btnstaff">Alumnos</button>
                </Link>
              </div>
            )}

            {(userLevel === 'admin' ||
              userLevel === 'administrador' ||
              userLevel === 'gerente' ||
              userLevel === 'vendedor') && (
              <div className="bg-white font-bignoodle w-[250px] h-[100px] text-[20px] lg:w-[400px] lg:h-[150px] lg:text-[30px] mx-auto flex justify-center items-center rounded-tr-xl rounded-bl-xl">
                <Link to="/dashboard/novedades">
                  <button className="btnstaff">Rutinas</button>
                </Link>
              </div>
            )}
            {(userLevel === 'admin' ||
              userLevel === 'administrador' ||
              userLevel === 'instructor' ||
              userLevel === 'gerente') && (
              <div className="bg-white font-bignoodle w-[250px] h-[100px] text-[20px] lg:w-[400px] lg:h-[150px] lg:text-[30px] mx-auto flex justify-center items-center rounded-tr-xl rounded-bl-xl">
                <Link to="/dashboard/estadisticas">
                  <button className="btnstaff">Estadísticas</button>
                </Link>
              </div>
            )}
          </div>

          {/* <div className="flex justify-end p-5">
            <a
              className="relative inline-block"
              href="#"
              onClick={abrirModalPreguntas}
            >
              {(userLevel === 'gerente' ||
                userLevel === 'admin' ||
                userLevel === 'vendedor' ||
                userLevel === 'administrador') && (
                <div>
                  <span className="absolute top-0 left-0 mt-1 ml-1 h-full w-full rounded bg-[#fc4b08]"></span>
                  <span className="fold-bold relative inline-block rounded border-2 border-[#343333] bg-white px-3 py-1 text-base font-bold text-[#fc4b08] transition duration-100 hover:bg-[#fc4b08] hover:text-white">
                    VER FAQs
                  </span>
                </div>
              )}
            </a>
          </div> */}
        </div>
      </section>
    </>
  );
};

export default AdminPage;
