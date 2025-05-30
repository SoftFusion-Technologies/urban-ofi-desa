/*
 * Programador: Benjamin Orellana
 * Fecha Creación: 26 / 05 / 2025
 * Versión: 1.0
 *
 * Descripción:
 * Este archivo (AuthContext.jsx) es el componente el cual valida el login del usuario con un token.
 *
 * Tema: Renderizacion
 * Capa: Frontend
 * Contacto: benjamin.orellanaof@gmail.com || 3863531891
 */

import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Estados locales para el token, nombre, nivel, nombre y apellido y el id del alumno
  const [authToken, setAuthToken] = useState(null);
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState(null); // <-- nuevo estado para el id del usuario
  const [userLevel, setUserLevel] = useState('');
  const [nomyape, setNomyape] = useState(''); // nombre y apellido alumno
  const [alumnoId, setAlumnoId] = useState(null); // id alumno

  useEffect(() => {
    // Recuperar datos desde localStorage
    const token = localStorage.getItem('authToken');
    const username = localStorage.getItem('userName');
    const idStored = localStorage.getItem('userId'); // <--- recupero el userId
    const level = localStorage.getItem('userLevel');
    const alumnoNomyape = localStorage.getItem('nomyape');
    const alumnoIdStored = localStorage.getItem('alumnoId');

    if (token) setAuthToken(token);
    if (username) setUserName(username);
    if (idStored) setUserId(idStored);
    if (level) setUserLevel(level);
    if (alumnoNomyape) setNomyape(alumnoNomyape);
    if (alumnoIdStored) setAlumnoId(alumnoIdStored);
  }, []);

  const login = (token, username, level, id) => {
    setAuthToken(token);
    setUserName(username);
    setUserLevel(level);
    setUserId(id);
    localStorage.setItem('authToken', token);
    localStorage.setItem('userName', username);
    localStorage.setItem('userLevel', level);
  };

  // Login para alumno: guarda token, nomyape y id
  const loginAlumno = (token, alumnoNombreApellido, id) => {
    setAuthToken(token);
    setNomyape(alumnoNombreApellido);
    setAlumnoId(id);
    localStorage.setItem('authToken', token);
    localStorage.setItem('nomyape', alumnoNombreApellido);
    localStorage.setItem('alumnoId', id);
  };

  const logout = () => {
    setAuthToken(null);
    setUserName('');
    setUserId(null);
    setUserLevel('');
    setNomyape('');
    setAlumnoId(null);

    localStorage.removeItem('authToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');
    localStorage.removeItem('userLevel');
    localStorage.removeItem('nomyape');
    localStorage.removeItem('alumnoId');
  };

  return (
    <AuthContext.Provider
      value={{
        authToken,
        userName,
        userId,
        userLevel,
        nomyape,
        alumnoId,
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
