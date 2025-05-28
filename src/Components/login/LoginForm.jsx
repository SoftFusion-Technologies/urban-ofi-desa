/*
 * Programador: Benjamin Orellana
 * Fecha Creación: 26 / 05 / 2025
 * Versión: 1.0
 *
 * Descripción:
 * Este archivo (LoginForm.jsx) es el componente el cual realiza el logeo de los usuarios mendiante una validacion de la base de datos y un token de sesion.
 *
 * Tema: Renderizacion
 * Capa: Frontend
 * Contacto: benjamin.orellanaof@gmail.com || 3863531891
 */

import React, { useState } from 'react';
import Modal from 'react-modal';
import Alerta from '../Error';
import { useNavigate } from 'react-router-dom';
import Validation from './LoginValidation';
import axios from 'axios';
import '../../Styles/login.css';
import { useAuth } from '../../AuthContext';
import { useLocation } from 'react-router-dom';

Modal.setAppElement('#root');

const LoginForm = () => {
  const location = useLocation();
  const isAlumno = location.pathname === '/soyalumno';

  const [values, setValues] = useState({
    email: '',
    password: '',
    telefono: '',
    dni: ''
  });

  const navigate = useNavigate();
  const { login, loginAlumno } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value
    }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = Validation(values, location.pathname);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);

      const endpoint = isAlumno
        ? 'http://localhost:8080/loginAlumno'
        : 'http://localhost:8080/login';

      const payload = isAlumno
        ? { telefono: values.telefono, dni: values.dni }
        : { email: values.email, password: values.password };

      axios
        .post(endpoint, payload)
        .then((res) => {
          setLoading(false);
          if (res.data.message === 'Success') {
            if (isAlumno) {
              loginAlumno(res.data.token, res.data.nomyape);
              navigate('/dashboard');
            } else {
              login(res.data.token, values.email, res.data.level);
              navigate('/dashboard');
            }
          } else {
            setModalMessage('Usuario o Contraseña incorrectos');
            setIsModalOpen(true);
          }
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    }
  };
  return (
    <div className="h-screen w-full">
      <div className="loginbg h-screen w-full flex justify-between items-center mx-auto">
        <div className="py-5 bg-white rounded-xl mx-auto">
          <form
            className="w-[400px] max-w-[400px] mx-auto max-sm:w-[300px] max-sm:max-w-[300px]"
            onSubmit={handleSubmit}
          >
            <div className="m-5">
              <h1 className="font-montserrat text-[25px] font-bold tracking-wide text-center">
                BIENVENIDO
              </h1>
            </div>

            {/* Campo de correo o teléfono */}
            <div className="mb-3 px-4">
              <input
                id={isAlumno ? 'telefono' : 'email'}
                type={isAlumno ? 'text' : 'email'}
                className="mt-2 block w-full p-3 text-black formulario__input bg-slate-100 rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                placeholder={isAlumno ? 'Teléfono' : 'Correo Electrónico'}
                name={isAlumno ? 'telefono' : 'email'}
                onChange={handleInput}
              />
              {isAlumno
                ? errors.telefono && <Alerta>{errors.telefono}</Alerta>
                : errors.email && <Alerta>{errors.email}</Alerta>}
            </div>

            {/* Campo de contraseña o DNI */}
            <div className="mb-3 px-4">
              <div className="relative flex items-center">
                <input
                  id={isAlumno ? 'dni' : 'password'}
                  type={showPassword ? 'text' : 'password'}
                  className="mt-2 block w-full p-3 text-black formulario__input bg-slate-100 rounded-xl focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                  placeholder={isAlumno ? 'Contraseña' : 'Contraseña'}
                  name={isAlumno ? 'dni' : 'password'}
                  onChange={handleInput}
                />
                <button
                  className="absolute right-0 mr-4 text-sm text-gray-500 hover:text-gray-700 focus:outline-none"
                  type="button"
                  onClick={toggleShowPassword}
                  style={{ transform: 'translateY(25%)' }}
                >
                  {showPassword ? 'Ocultar' : 'Mostrar'}
                </button>
              </div>
              {isAlumno
                ? errors.dni && <Alerta>{errors.dni}</Alerta>
                : errors.password && <Alerta>{errors.password}</Alerta>}
            </div>

            <div className="mx-auto flex justify-center my-5">
              <button
                type="submit"
                className="bg-blue-500 py-2 px-5 rounded-xl text-white font-bold hover:cursor-pointer hover:bg-[#0c08fc] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-100"
              >
                Iniciar Sesión
              </button>
            </div>
          </form>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Error Modal"
        className="flex justify-center items-center h-screen"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <div className="bg-white rounded-lg p-6 max-w-md mx-auto">
          <h2 className="text-lg font-semibold mb-4">Error</h2>
          <div>{modalMessage}</div>
          <button
            onClick={() => setIsModalOpen(false)}
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Cerrar
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default LoginForm;
