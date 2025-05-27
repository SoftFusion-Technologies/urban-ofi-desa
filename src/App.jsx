/*
 * Programador: Benjamin Orellana
 * Fecha Creación: 26 / 05 / 2025
 * Versión: 1.0
 *
 * Descripción:
 *  Este archivo (App.jsx) es el componente principal de la aplicación.
 *  Contiene la configuración de enrutamiento, carga de componentes asíncrona,
 *  y la lógica para mostrar un componente de carga durante la carga inicial.
 *  Además, incluye la estructura principal de la aplicación, como la barra de navegación,
 *  el pie de página y las diferentes rutas para las páginas de la aplicación.
 *
 * Tema: Configuración de la Aplicación Principal
 * Capa: Frontend
 * Contacto: benjamin.orellanaof@gmail.com || 3863531891
 */

import './App.css';
import {
  BrowserRouter as Router,
  Routes as Rutas,
  Route as Ruta,
  useLocation
} from 'react-router-dom'; // IMPORTAMOS useLocation PARA OCULTAR COMPONENTES

import { AuthProvider } from './AuthContext';
import ProtectedRoute from './ProtectedRoute';
import Home from './Components/Home/Home';
import NavBar from './Components/Header/NavBar/NavBar';
import Footer from './Components/Footer';

// PAGINAS
import Contacto from './Pages/Contacto';
import NotFound from './Pages/NotFound';
import QuienesSomos from './Pages/QuienesSomos';

// LOGIN
import LoginForm from './Components/login/LoginForm';
import AdminPage from './Pages/staff/AdminPage';
import UsersGet from './Pages/MetodsGet/UserGet';
import InstructoresGet from './Pages/MetodsGet/InstructoresGet'
import AlumnosGet from './Pages/MetodsGet/AlumnosGet';
// COMPONENTE CONTENEDOR PARA CONTROLAR LO QUE SE MUESTRA SEGÚN LA RUTA
function AppContent() {
  const location = useLocation();
  const hideLayoutFooter = location.pathname === '/login'; // OCULTAMOS NAVBAR Y FOOTER EN /login
  const hideLayoutNav = [
    '/login',
    '/dashboard',
    '/dashboard/users',
    '/dashboard/instructores',
    '/dashboard/students'
  ].includes(location.pathname);

  return (
    <>
      {!hideLayoutNav && <NavBar />}
      <Rutas>
        <Ruta path="/" element={<Home />} />
        <Ruta path="/contacto" element={<Contacto />} />
        <Ruta path="/quienes-somos" element={<QuienesSomos />} />
        {/* componentes del staff y login INICIO */}
        <Ruta path="/login" element={<LoginForm />} />
        <Ruta
          path="/dashboard"
          element={
            <ProtectedRoute>
              {' '}
              <AdminPage />{' '}
            </ProtectedRoute>
          }
        />
        <Ruta
          path="/dashboard/users"
          element={
            <ProtectedRoute>
              {' '}
              <UsersGet />{' '}
            </ProtectedRoute>
          }
        />{' '}
        <Ruta
          path="/dashboard/instructores"
          element={
            <ProtectedRoute>
              {' '}
              <InstructoresGet />{' '}
            </ProtectedRoute>
          }
        />{' '}
        <Ruta
          path="/dashboard/students"
          element={
            <ProtectedRoute>
              {' '}
              <AlumnosGet />{' '}
            </ProtectedRoute>
          }
        />{' '}
        {/* componentes del staff y login FINAL */}
        <Ruta path="/*" element={<NotFound />} />
      </Rutas>
      {!hideLayoutFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
