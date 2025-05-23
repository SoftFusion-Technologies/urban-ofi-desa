import { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../../../Images/imgLogo.jpg'; // Asegúrate de que sea el logo limpio y nítido

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { to: '/', label: 'Inicio' },
    { to: '/clases', label: 'Clases' },
    { to: '/productos', label: 'Productos' },
    { to: '/party-urban', label: 'Party Urban' },
    { to: '/nosotros/quienessomos', label: '¿Quiénes Somos?' },
    { to: '/contacto', label: 'Contacto' }
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-white dark:bg-gray-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-4">
          <img
            src={logo}
            alt="Urban"
            className="h-20 w-20 object-contain drop-shadow-lg rounded-full"
          />
        </Link>

        {/* MENÚ DESKTOP */}
        <div className="hidden lg:flex space-x-10 uppercase text-base font-medium tracking-wider">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="text-gray-700 hover:text-[#0849B5] transition-colors duration-200 dark:text-white dark:hover:text-[#0849B5]"
            >
              {label}
            </Link>
          ))}
        </div>

        {/* BOTÓN HAMBURGUESA */}
        <div className="lg:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-800 dark:text-white text-3xl"
          >
            {isOpen ? <HiOutlineX /> : <HiOutlineMenu />}
          </button>
        </div>
      </div>

      {/* MENÚ MÓVIL */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden bg-white dark:bg-gray-800 px-6 py-4 space-y-4 uppercase font-medium tracking-wide text-base"
          >
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setIsOpen(false)}
                className="block text-gray-700 hover:text-[#0849B5] dark:text-white dark:hover:text-[#0849B5]"
              >
                {label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
