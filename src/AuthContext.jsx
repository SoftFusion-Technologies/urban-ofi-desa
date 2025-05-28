/*
 * Programador: Emir Segovia
 * Fecha Cración: 05 / 06 / 2024
 * Versión: 1.0
 *
 * Descripción:
 * Este archivo (AuthContext.jsx) es el componente el cual valida el login del usuario con un token.
 *
 * Tema: Renderizacion
 * Capa: Frontend
 * Contacto: emirvalles90f@gmail.com || 3865761910
 */

import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Definir estados locales para el token de autenticación y el nombre de usuario
  const [authToken, setAuthToken] = useState(null);
  const [userName, setUserName] = useState('');
  const [userLevel, setUserLevel] = useState('');
  const [nomyape, setNomyape] = useState(''); // nombre y apellido alumno

  useEffect(() => {
    // Obtener el token y el nombre de usuario desde el localStorage
    const token = localStorage.getItem('authToken');
    const username = localStorage.getItem('userName');
    const level = localStorage.getItem('userLevel');
    const alumnoNomyape = localStorage.getItem('nomyape');
    // Si hay un token en el localStorage, establecerlo en el estado local
    if (token) {
      setAuthToken(token);
    }
    // Si hay un nombre de usuario en el localStorage, establecerlo en el estado local
    if (username) {
      setUserName(username);
    }
    if (level) {
      setUserLevel(level);
    }
    if (alumnoNomyape) {
      setNomyape(alumnoNomyape);
    }
  }, []); // El array vacío asegura que este efecto se ejecute solo una vez al montar el componente

  const login = (token, username, level) => {
    // Establecer el token y el nombre de usuario en el estado local
    setAuthToken(token);
    setUserName(username);
    setUserLevel(level);
    // Guardar el token y el nombre de usuario en el localStorage
    localStorage.setItem('authToken', token);
    localStorage.setItem('userName', username);
    localStorage.setItem('userLevel', level);
  };

  // Función login para alumno (que guarda nomyape)
  const loginAlumno = (token, alumnoNombreApellido) => {
    setAuthToken(token);
    setNomyape(alumnoNombreApellido);
    localStorage.setItem('authToken', token);
    localStorage.setItem('nomyape', alumnoNombreApellido);
  };

  const logout = () => {
    // Limpiar el token y el nombre de usuario del estado local
    setAuthToken(null);
    setUserName('');
    setUserLevel('');
    setNomyape('');
    // Remover el token y el nombre de usuario del localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('userLevel');
    localStorage.removeItem('nomyape');
  };

  return (
    <AuthContext.Provider
      value={{
        authToken,
        userName,
        userLevel,
        nomyape,
        login,
        loginAlumno,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
