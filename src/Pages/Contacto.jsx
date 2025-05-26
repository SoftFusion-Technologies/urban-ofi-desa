import { motion } from 'framer-motion';
import {
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
  FaEnvelope
} from 'react-icons/fa';
import React, { useEffect } from 'react';
import ParticlesBackground from '../Components/ParticlesBackground';
// Animación para las redes sociales (stagger)
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

const Contacto = () => {
  useEffect(() => {
    const element = document.getElementById('contacto');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return (
    <section
      id="contacto"
      className="mt-20 relative z-10 py-20 px-6 bg-gradient-to-b from-blue-950 via-blue-900 to-blue-800 text-white min-h-[650px] flex flex-col justify-center"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      {/* Fondo animado */}
      <canvas
        id="particles"
        className="absolute inset-0 -z-10"
        style={{ pointerEvents: 'none' }}
      />

      <ParticlesBackground />
      <motion.div
        className="max-w-5xl mx-auto text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <h2
          className="titulo text-5xl md:text-6xl font-extrabold mb-6 tracking-wide"
          style={{
            textShadow: '0 0 8px #3b82f6, 0 0 12px #2563eb, 0 0 20px #1d4ed8'
          }}
        >
          URBAN FITNESS
        </h2>
        <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-14 opacity-90 leading-relaxed">
          Más de{' '}
          <span className="font-bold text-blue-400">
            9 años transformando entrenamientos
          </span>{' '}
          y potenciando a personas como vos. Estamos listos para dar el
          siguiente paso junto a vos.
        </p>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-10 max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Redes sociales */}
          {[
            {
              href: 'https://www.facebook.com/urbanfitnesstucuman/',
              icon: <FaFacebook />,
              label: 'Facebook',
              color: 'hover:text-blue-400'
            },
            {
              href: 'https://www.instagram.com/urbanfitnesstucuman/',
              icon: <FaInstagram />,
              label: 'Instagram',
              color: 'hover:text-pink-400'
            },
            {
              href: 'https://api.whatsapp.com/send?phone=5493813643118',
              icon: <FaWhatsapp />,
              label: 'WhatsApp',
              color: 'hover:text-green-400'
            }
            // {
            //   href: 'mailto:contacto@urbanfitness.com.ar',
            //   icon: <FaEnvelope />,
            //   label: 'Email',
            //   color: 'hover:text-yellow-300'
            // }
          ].map(({ href, icon, label, color }, i) => (
            <motion.a
              key={i}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className={`flex flex-col items-center justify-center bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-lg border border-white/20 transition-transform transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-400 ${color}`}
              variants={itemVariants}
              whileFocus={{ scale: 1.1 }}
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <span className="text-6xl mb-4">{icon}</span>
              <span className="text-lg font-semibold tracking-wide">
                {label}
              </span>
            </motion.a>
          ))}

          {/* Botón especial para contacto */}
          {/* <motion.div
            className="col-span-full sm:col-auto flex justify-center items-center"
            variants={itemVariants}
          >
            <a
              href="https://wa.me/123456789"
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-block bg-gradient-to-r from-green-400 to-green-600 text-white px-14 py-5 rounded-full font-extrabold shadow-xl tracking-wide cursor-pointer
              hover:from-green-500 hover:to-green-700
              focus:outline-none focus:ring-4 focus:ring-green-300
              transition-transform transform
              animate-pulse"
              aria-label="Contactar por WhatsApp"
            >
              <FaWhatsapp className="inline-block mr-3 -mt-1 text-2xl" />
              Contactanos por WhatsApp
            </a>
          </motion.div> */}
        </motion.div>

        <motion.p
          className="mt-16 max-w-2xl mx-auto text-gray-300 italic tracking-wide"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          viewport={{ once: true }}
        >
          "Transformamos vidas y entrenamientos con pasión y compromiso."
        </motion.p>
      </motion.div>

      {/* Incluir script para partículas */}
      <Particles />
    </section>
  );
};

// Componente para fondo de partículas
const Particles = () => {
  React.useEffect(() => {
    const canvas = document.getElementById('particles');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;
    let particlesArray = [];

    function init() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      particlesArray = [];
      for (let i = 0; i < 70; i++) {
        particlesArray.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 1.5 + 0.5,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          opacity: Math.random() * 0.4 + 0.1
        });
      }
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);
      particlesArray.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59, 130, 246, ${p.opacity})`; // azul semi-transparente
        ctx.fill();
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0 || p.x > width) p.speedX = -p.speedX;
        if (p.y < 0 || p.y > height) p.speedY = -p.speedY;
      });
      requestAnimationFrame(animate);
    }

    init();
    animate();
    window.addEventListener('resize', init);
    return () => window.removeEventListener('resize', init);
  }, []);

  return null;
};

export default Contacto;
