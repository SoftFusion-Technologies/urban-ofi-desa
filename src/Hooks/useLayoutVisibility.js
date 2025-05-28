// src/Hooks/useLayoutVisibility.js
import { useLocation } from 'react-router-dom';

const useLayoutVisibility = () => {
  const location = useLocation();

  const hideLayoutFooter = location.pathname === '/login';

  const hideLayoutNav = [
    '/login',
    '/dashboard',
    '/dashboard/users',
    '/dashboard/instructores',
    '/dashboard/students',
    '/dashboard/estadisticas',
    '/dashboard/students-pendientes',
    '/soyalumno'
  ].includes(location.pathname);

  return { hideLayoutFooter, hideLayoutNav };
};

export default useLayoutVisibility;
