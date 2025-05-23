import './App.css';
import {
  BrowserRouter as Router,
  Routes as Rutas,
  Route as Ruta
} from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import ProtectedRoute from './ProtectedRoute';
import Home from './Components/Home';
import NavBar from './Components/Header/NavBar/NavBar';
function App() {
  return (
    <AuthProvider>
      {/* <div className="back_v2"> */}
      <Router>
        <NavBar></NavBar>
        <Rutas>
          <Ruta path="/" element={<Home />} />{' '}
        </Rutas>
      </Router>
    </AuthProvider>
  );
}

export default App;
