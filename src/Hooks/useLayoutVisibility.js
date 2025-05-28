// src/Hooks/useLayoutVisibility.js
import { useLocation } from 'react-router-dom';

const useLayoutVisibility = () => {
  const location = useLocation();

  const path = location.pathname;

  const hideLayoutFooter = path === '/login';

  const hideLayoutNav =
    path === '/login' ||
    path === '/soyalumno' ||
    path.startsWith('/dashboard') ||
    path.startsWith('/miperfil');

  return { hideLayoutFooter, hideLayoutNav };
};

export default useLayoutVisibility;
