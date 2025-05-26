import React from 'react';
import { motion } from 'framer-motion';
import { FaExclamationTriangle } from 'react-icons/fa';
import ParticlesBackground from '../Components/ParticlesBackground';

const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.15, duration: 0.8 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 120, duration: 0.6 }
  }
};

const NotFound = () => {
  return (
    <motion.section
      className="mt-10 relative z-10 py-20 px-6 bg-gradient-to-b from-blue-950 via-blue-900 to-blue-800 text-white min-h-[650px] flex flex-col justify-center items-center text-center"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <ParticlesBackground />

      <motion.div
        className="bg-white/10 backdrop-blur-lg p-10 rounded-3xl shadow-xl border border-white/20 max-w-lg"
        variants={itemVariants}
      >
        <FaExclamationTriangle className="mx-auto text-yellow-400 text-8xl mb-6" />
        <h1 className="text-5xl font-bold mb-4 tracking-tight">¡Oops!</h1>
        <p className="text-lg mb-6 opacity-90">
          La página que buscas no existe o ha sido movida.
        </p>
        <p className="mb-8 opacity-80">
          Pero no te preocupes, estamos acá para ayudarte a encontrar el camino.
        </p>
        <a
          href="/"
          className="inline-block px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-500 hover:to-blue-700 text-white rounded-full font-bold shadow-lg transition-transform hover:scale-105"
        >
          Volver al inicio
        </a>
      </motion.div>
    </motion.section>
  );
};

export default NotFound;
