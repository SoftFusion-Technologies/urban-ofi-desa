import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../../../Images/imgLogo.jpg';
import FormAltaAlumnoPendiente from '../../Forms/FormAltaAlumnoPendiente';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const location = useLocation();
  const [isContactOpen, setIsContactOpen] = useState(false);

  const navLinks = [
    { to: '/', label: 'Inicio' },
    { to: '/clases', label: 'Clases' },
    { to: '/productos', label: 'Productos' },
    { to: '/party-urban', label: 'Party Urban' },
    { to: '/quienes-somos', label: '¿Quiénes Somos?' },
    { to: '/contacto', label: 'Contacto' }
  ];

  // Detectar scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md py-2' : 'bg-white py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-10 transition-all duration-300">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-4">
          <img
            src={logo}
            alt="Urban Fitness"
            className={`object-cover rounded-full shadow-md transition-all duration-300 ${
              scrolled ? 'h-16 w-16' : 'h-24 w-24'
            }`}
          />
        </Link>

        {/* Menú desktop */}
        <div className="hidden lg:flex items-center space-x-10 uppercase text-sm font-semibold tracking-widest">
          {navLinks.map(({ to, label }) => {
            const isActive = location.pathname === to;
            return (
              <Link key={to} to={to} className="relative group overflow-hidden">
                {/* Texto */}
                <span
                  className={`relative z-10 px-2 transition-colors duration-300 ${
                    isActive
                      ? 'text-white'
                      : 'text-blue-700 group-hover:text-white'
                  }`}
                >
                  {label}
                </span>

                {/* Burbuja de fondo */}
                <span
                  className={`absolute inset-0 bg-[#0849B5] rounded-full scale-x-0 origin-center transition-transform duration-300 ease-in-out group-hover:scale-x-100 ${
                    isActive ? 'scale-x-100' : ''
                  }`}
                ></span>
              </Link>
            );
          })}
        </div>

        {/* Botón Call to Action */}
        <div className="hidden lg:block">
          <button
            onClick={() => setIsContactOpen(true)}
            className="px-6 py-2 bg-[#0849B5] text-white rounded-full font-semibold uppercase tracking-wide hover:bg-blue-700 hover:scale-105 transition-transform duration-300"
          >
            Soy Socio - Rutina
          </button>
        </div>

        {/* Menú móvil */}
        <div className="lg:hidden">
          <button
            onClick={toggleMenu}
            className="text-blue-700 text-3xl"
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
            className="lg:hidden bg-white px-6 py-6 uppercase font-semibold tracking-wide text-base space-y-6 shadow-md"
          >
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setIsOpen(false)}
                className={`block text-center transition-colors duration-200 ${
                  location.pathname === to
                    ? 'text-white bg-[#0849B5] rounded-full py-2'
                    : 'text-gray-700 hover:text-[#0849B5]'
                }`}
              >
                {label}
              </Link>
            ))}
            <button
              onClick={() => setIsContactOpen(true)}
              className="block mx-auto px-6 py-2 bg-[#0849B5] text-white rounded-full font-semibold uppercase tracking-wide hover:bg-blue-700 hover:scale-105 transition-transform duration-300"
            >
              Soy Socio - Rutina
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      <FormAltaAlumnoPendiente
        open={isContactOpen}
        setIsOpen={setIsContactOpen}
      />
    </motion.nav>
  );
};

export default Navbar;
