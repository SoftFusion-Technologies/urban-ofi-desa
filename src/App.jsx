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
import LoginForm from './Components/login/LoginForm';

// COMPONENTE CONTENEDOR PARA CONTROLAR LO QUE SE MUESTRA SEGÚN LA RUTA
function AppContent() {
  const location = useLocation();
  const hideLayout = location.pathname === '/login'; // OCULTAMOS NAVBAR Y FOOTER EN /login
  // const hideLayout = ['/login', '/register', '/recover'].includes(
  //   location.pathname
  // );

  return (
    <>
      {!hideLayout && <NavBar />}
      <Rutas>
        <Ruta path="/" element={<Home />} />
        <Ruta path="/contacto" element={<Contacto />} />
        <Ruta path="/quienes-somos" element={<QuienesSomos />} />
        <Ruta path="/login" element={<LoginForm />} />
        <Ruta path="/*" element={<NotFound />} />
      </Rutas>
      {!hideLayout && <Footer />}
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
