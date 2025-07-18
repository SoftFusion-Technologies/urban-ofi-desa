import React, { useState, useEffect } from 'react';
import logoUrban from '../../Images/staff/imgLogo.jpg';
import menu from '../../Images/staff/menu.png';
import close from '../../Images/staff/close.png';
import { Link } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import { useNavigate } from 'react-router-dom';
import NotificationBell from './NotificationBell';

const NavbarStaff = () => {
  const [active, setActive] = useState('');
  const [toggle, setToggle] = useState(false);
  const { logout, userName, nomyape } = useAuth(); // agrego nomyape
  const navigate = useNavigate();

  const { userLevel } = useAuth();

  const [displayUserName, setDisplayUserName] = useState('');

  useEffect(() => {
    // Priorizar nomyape si existe (es para soyalumno)
    if (nomyape) {
      const primerNombre = nomyape.trim().split(' ')[0];
      setDisplayUserName(primerNombre);
      return;
    }

    // Si no hay nomyape, usamos userName (login normal)
    if (!userName) {
      setDisplayUserName('');
      return;
    }

    if (userName.includes('@')) {
      const atIndex = userName.indexOf('@');
      setDisplayUserName(userName.substring(0, atIndex));
      return;
    }

    const primerNombreUser = userName.trim().split(' ')[0];
    setDisplayUserName(primerNombreUser);
  }, [userName, nomyape]);

  const handleLogout = () => {
    // 1. LEER primero el tipo de usuario antes de borrar localStorage
    const userLevel = localStorage.getItem('userLevel');
    logout();
    // 2. Redirigir según tipo
    if (userLevel === 'alumno') {
      navigate('/soyalumno');
    } else {
      navigate('/login');
    }
  };

  const Links = [
    {
      id: 1,
      href: 'dashboard',
      title: 'Dashboard',
      roles: ['admin', 'instructor'] // Benjamin Orellana INI / 12/06/2024 /nueva forma de gestionar los accesos
    },
    {
      id: 2,
      href: 'dashboard/users',
      title: 'Usuarios',
      roles: ['admin', 'administrador']
    },
    {
      id: 3,
      href: 'dashboard/administracion-colores',
      title: 'Adm. Colores',
      roles: ['admin', 'instructor'] // Benjamin Orellana INI / 12/06/2024 /nueva forma de gestionar los accesos
    }
  ];

  const filteredLinks =
    userLevel === 'alumno'
      ? []
      : Links.filter((link) => link.roles.includes(userLevel));

  return (
    <>
      {/* Navbar section */}
      <nav className="w-full bg-white shadow-md z-20 px-6 xl:px-0">
        <div className="max-w-7xl mx-auto flex justify-between items-center py-2">
          {/* Logo */}
          <Link to="/">
            <img src={logoUrban} alt="Logo" className="h-12 object-contain" />
          </Link>

          {/* Links para escritorio */}
          <ul className="hidden lg:flex gap-8 items-center">
            {filteredLinks.map((link) => (
              <li
                key={link.id}
                className={`${
                  active === link.title
                    ? 'text-blue-600 font-semibold'
                    : 'text-gray-800'
                } hover:text-blue-500 text-[15px] cursor-pointer transition-all`}
                onClick={() => setActive(link.title)}
              >
                <Link to={`/${link.href}`}>{link.title}</Link>
              </li>
            ))}
          </ul>

          {/* Usuario + Notificación + Logout */}
          <div className="hidden lg:flex items-center gap-4">
            <NotificationBell />
            <span className="text-sm text-gray-600">
              Bienvenido <strong>{displayUserName}</strong>
            </span>
            <button
              onClick={handleLogout}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1.5 rounded-md transition-all"
            >
              Cerrar sesión
            </button>
          </div>

          {/* Mobile: campana + menú */}
          <div className="lg:hidden flex items-center gap-3">
            <NotificationBell />
            <img
              src={toggle ? close : menu}
              alt="hamburger"
              className="w-7 h-7 object-contain cursor-pointer"
              onClick={() => setToggle(!toggle)}
            />
          </div>

          {/* Menú móvil */}
          <div
            className={`${
              !toggle ? 'hidden' : 'flex'
            } flex-col gap-4 absolute top-20 right-4 bg-white rounded-lg p-4 shadow-md z-30`}
          >
            <span className="text-sm text-gray-600">
              ¡Bienvenido <strong>{displayUserName}</strong>!
            </span>
            <hr />
            <ul className="flex flex-col gap-3">
              {filteredLinks.map((link) => (
                <li
                  key={link.id}
                  className={`${
                    active === link.title
                      ? 'text-blue-600 font-semibold'
                      : 'text-gray-800'
                  } hover:text-blue-500 text-sm cursor-pointer`}
                  onClick={() => {
                    setActive(link.title);
                    setToggle(false);
                  }}
                >
                  <Link to={`/${link.href}`}>{link.title}</Link>
                </li>
              ))}
            </ul>
            <hr />
            <button
              onClick={handleLogout}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1.5 rounded-md"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavbarStaff;
