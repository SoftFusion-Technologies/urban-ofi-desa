import './App.css';
import {
  BrowserRouter as Router,
  Routes as Rutas,
  Route as Ruta
} from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import ProtectedRoute from './ProtectedRoute';
import Home from './Components/Home/Home';
import NavBar from './Components/Header/NavBar/NavBar';
import Footer from './Components/Footer';

// PAGINAS
import Contacto from './Pages/Contacto';
import NotFound from './Pages/NotFound';

function App() {
  return (
    <AuthProvider>
      {/* <div className="back_v2"> */}
      <Router>
        <NavBar></NavBar>
        <Rutas>
          <Ruta path="/" element={<Home />} />{' '}
          <Ruta path="/contacto" element={<Contacto />} />{' '}
          <Ruta path="/*" element={<NotFound />} />{' '}
        </Rutas>
        <Footer></Footer>
      </Router>
    </AuthProvider>
  );
}

export default App;
