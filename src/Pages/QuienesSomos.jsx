import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import ParticlesBackground from '../Components/ParticlesBackground';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120 } }
};

const QuienesSomos = () => {
  useEffect(() => {
    const element = document.getElementById('quienes-somos');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return (
    <section
      id="quienes-somos"
      className="mt-20 relative z-10 py-20 px-6 bg-gradient-to-b from-blue-900 via-blue-800 to-blue-700 text-white min-h-[650px] flex flex-col justify-center"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      <canvas
        id="particles"
        className="absolute inset-0 -z-10"
        style={{ pointerEvents: 'none' }}
      />
      <ParticlesBackground />

      <motion.div
        className="max-w-5xl mx-auto text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <motion.h2
          className="titulo text-5xl md:text-6xl font-extrabold mb-6 tracking-wide"
          style={{
            textShadow: '0 0 8px #60a5fa, 0 0 12px #3b82f6, 0 0 20px #2563eb'
          }}
          variants={itemVariants}
        >
          QUIÉNES SOMOS
        </motion.h2>

        <motion.p
          className="text-xl md:text-2xl max-w-3xl mx-auto mb-10 opacity-90 leading-relaxed"
          variants={itemVariants}
        >
          Somos un equipo{' '}
          <span className="font-bold text-blue-400">
            dedicado a la innovación y la excelencia
          </span>{' '}
          en entrenamiento físico y bienestar. Nuestro objetivo es{' '}
          <em>impulsar tu potencial</em> con planes personalizados, tecnología
          avanzada y mucho compromiso humano.
        </motion.p>

        <motion.p
          className="text-lg md:text-xl max-w-4xl mx-auto mb-14 opacity-80 leading-relaxed"
          variants={itemVariants}
        >
          Con más de 9 años de experiencia, creemos en una transformación
          integral que va más allá del ejercicio. Somos pasión, ciencia y
          resultados, fusionados para que logres cada meta con motivación y
          respaldo profesional.
        </motion.p>

        {/* Nueva sección para contar qué tienen */}
        <motion.div
          className="max-w-6xl mx-auto mt-12 p-12 rounded-3xl bg-gradient-to-r from-blue-800 via-blue-700 to-blue-900 shadow-lg flex flex-col md:flex-row gap-10 items-center"
          variants={itemVariants}
        >
          {/* Columna de texto */}
          <div className="flex-1 text-white">
            <h3 className="text-4xl font-extrabold mb-6 tracking-wide text-white titulo drop-shadow-lg">
              NOSOTROS
            </h3>
            <p className="mb-8 text-lg md:text-xl leading-relaxed opacity-90">
              No solo diseñamos planes de entrenamiento, creamos
              un vínculo real con vos. Somos tu equipo de apoyo constante,
              combinando pasión, conocimiento y tecnología para que cada paso
              hacia tu mejor versión sea acompañado, motivador y auténtico.
              <br />
              <span className="font-bold text-blue-400">
                Juntos transformamos hábitos, construimos fuerza y celebramos
                cada logro,
              </span>{' '}
              porque tu progreso es nuestra mayor recompensa.
            </p>
            <p className="text-lg md:text-xl leading-relaxed opacity-80">
              Renovamos día a día nuestro espacio con equipos de última
              generación y tecnología de punta, para que tu entrenamiento sea no
              solo efectivo y seguro, sino también una experiencia innovadora
              que te inspire a superar tus límites.
            </p>
          </div>

          {/* Columna de íconos destacados */}
          <div className="flex-1 grid grid-cols-2 gap-8 text-blue-300">
            {/* Ícono + texto 1 */}
            <div className="flex flex-col items-center text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 mb-4 text-blue-400 drop-shadow-lg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2l4 -4"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth={2}
                />
              </svg>
              <p className="font-semibold text-lg">Rutinas personalizadas</p>
            </div>

            {/* Ícono + texto 2 */}
            <div className="flex flex-col items-center text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 mb-4 text-blue-400 drop-shadow-lg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8v4l3 3"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth={2}
                />
              </svg>
              <p className="font-semibold text-lg">
                Seguimiento en tiempo real
              </p>
            </div>

            {/* Ícono + texto 3 */}
            <div className="flex flex-col items-center text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 mb-4 text-blue-400 drop-shadow-lg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 17l4-4l4 4"
                />
              </svg>
              <p className="font-semibold text-lg">Tecnología avanzada</p>
            </div>

            {/* Ícono + texto 4 */}
            <div className="flex flex-col items-center text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 mb-4 text-blue-400 drop-shadow-lg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7 16l-4-4m0 0l4-4m-4 4h18"
                />
              </svg>
              <p className="font-semibold text-lg">Máquinas de alta calidad</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default QuienesSomos;
