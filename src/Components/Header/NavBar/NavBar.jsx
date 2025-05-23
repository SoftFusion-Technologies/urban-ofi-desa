import { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../../../Images/imgLogo.jpg';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { to: '/', label: 'Inicio' },
    { to: '/clases', label: 'Clases' },
    { to: '/productos', label: 'Productos' },
    { to: '/party-urban', label: 'Party Urban' },
    { to: '/quienes-somos', label: '¿Quiénes Somos?' },
    { to: '/contacto', label: 'Contacto' }
  ];

  return (
    <nav className="fixed top-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-10 py-4">
        {/* Logo + Tagline */}
        <Link to="/" className="flex items-center gap-4">
          <img
            src={logo}
            alt="Urban Fitness"
            className="h-24 w-24 object-cover rounded-full shadow-md"
          />
        </Link>

        {/* Menú desktop */}
        <div className="hidden lg:flex items-center space-x-12 uppercase text-sm font-semibold tracking-widest">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="relative text-blue-700 hover:text-[#0849B5] transition-colors duration-300 group"
            >
              {/* Burbuja */}
              <span className="relative z-10 group-hover:text-white font-semibold uppercase tracking-wide">
                {label}
              </span>{' '}
              <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0 h-8 bg-[#0849B5] rounded-full transition-all duration-300 ease-in-out group-hover:w-full"></span>
              {/* Underline animado con group-hover */}
            </Link>
          ))}
        </div>

        {/* Botón Call to Action */}
        <div className="hidden lg:block">
          <Link
            to="/inscribite"
            className="px-5 py-2 bg-[#0849B5] text-white rounded-full font-semibold uppercase tracking-wide hover:bg-blue-700 transition"
          >
            Inscribite
          </Link>
        </div>

        {/* Menú móvil */}
        <div className="lg:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-800 dark:text-blue-700 text-3xl"
            aria-label="Toggle menu"
          >
            {isOpen ? <HiOutlineX /> : <HiOutlineMenu />}
          </button>
        </div>
      </div>

      {/* Menú móvil desplegable */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden bg-white dark:bg-gray-900 px-6 py-6 uppercase font-semibold tracking-wide text-base space-y-6"
          >
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setIsOpen(false)}
                className="text-center block text-gray-700 hover:text-[#0849B5] dark:text-white dark:hover:text-[#0849B5]"
              >
                {label}
              </Link>
            ))}
            <Link
              to="/inscribite"
              onClick={() => setIsOpen(false)}
              className="block bg-[#0849B5] text-white text-center rounded-full py-2 font-semibold hover:bg-blue-700 transition"
            >
              Inscribite
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
