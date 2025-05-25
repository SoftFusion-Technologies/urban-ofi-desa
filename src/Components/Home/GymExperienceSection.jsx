import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import BannerVideo from '../../Videos/videoHOme.mp4';

export default function GymExperienceSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // para que solo se active una vez
        }
      },
      {
        threshold: 0.4 // se activa cuando al menos el 30% está visible
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="max-w-7xl mx-auto px-8 py-20 flex flex-col lg:flex-row items-center gap-40"
    >
      {/* Izquierda */}
      {/* <div
        className={`relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-12 flex flex-col items-center lg:items-start text-center lg:text-left ${
          isVisible ? 'slide-in-left' : 'opacity-0'
        }`}
      >
        <div className="absolute -top-10 -left-10 w-24 h-24 bg-gradient-to-tr from-blue-400 to-blue-600 rounded-full opacity-20 blur-3xl -z-10"></div>
        <div className="absolute -bottom-12 right-8 w-32 h-32 border-8 border-blue-300 rounded-full opacity-10 -z-10"></div>

        <h2 className="text-gray-900 text-2xl sm:text-3xl font-light tracking-wide mb-2">
          Más de
        </h2>
        <h1 className="text-9xl font-extrabold text-blue-800 leading-none mb-3 select-none drop-shadow-md">
          9<span className="text-blue-600">+</span>
        </h1>
        <h3 className="text-blue-800 text-3xl sm:text-4xl font-semibold uppercase mb-5">
          años <br />
          transformando{' '}
          <span className="underline decoration-blue-500 decoration-4">
            vidas
          </span>
        </h3>
        <p className="text-gray-800 text-lg font-medium max-w-xs">
          Donde la <span className="font-bold text-blue-600">disciplina</span>{' '}
          se encuentra con la{' '}
          <span className="font-bold text-blue-800">innovación</span>, creando
          resultados reales.
        </p>
      </div> */}

      {/* Video dentro del mockup tipo iPhone PRO MEJORADO */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', duration: 1, delay: 0.2 }}
        viewport={{ once: true, amount: 0.4 }}
        className="relative w-[260px] md:w-[320px] lg:w-[420px] flex justify-center items-center group"
      >
        {/* Glow dinámico detrás */}
        <div className="absolute inset-0 rounded-[3rem] bg-pink opacity-20 blur-3xl group-hover:opacity-40 transition-all duration-700"></div>

        {/* Contenedor del iPhone */}
        <div className="relative w-full rounded-[2.5rem] bg-gradient-to-b from-gray-900 to-black p-3 shadow-2xl border-[6px] border-gray-800">
          {/* Notch superior */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-5 bg-gradient-to-b from-gray-600 to-gray-800 rounded-b-2xl z-20 shadow-md"></div>

          {/* Botones laterales simulados */}
          <div className="absolute left-[-6px] top-1/3 w-1.5 h-10 bg-gray-700 rounded-r-full"></div>
          <div className="absolute right-[-6px] top-1/2 w-1.5 h-16 bg-gray-700 rounded-l-full"></div>

          {/* Pantalla / Video */}
          <div className="rounded-[2rem] overflow-hidden">
            <motion.video
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              autoPlay
              loop
              muted
              playsInline
              src={BannerVideo}
              className="w-full h-auto block relative z-10 transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </div>
      </motion.div>
      {/* Derecha */}
      <div
        className={`w-full max-w-lg flex flex-col gap-8 text-white ${
          isVisible ? 'slide-in-right' : 'opacity-0'
        } lg:translate-x-12`}
        // en pantallas lg+ se desplaza 3rem (48px) a la derecha
      >
        <p className="titulo text-white uppercase mt-10 font-semibold text-2xl tracking-wide">
          Diseñado para tu máximo rendimiento.
        </p>
        <p className="cuerpo mb-6 text-lg leading-relaxed text-blue-600">
          Nuestros planes combinan ciencia, tecnología y coaching para que
          alcances tus metas de forma única.
        </p>

        <ul className="space-y-6 -mt-10">
          {[
            {
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8c-1.657 0-3 1.567-3 3.5S10.343 15 12 15s3-1.567 3-3.5-1.343-3.5-3-3.5z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364-5.364l-1.414 1.414M7.05 16.95l-1.414 1.414m12.728 0l1.414-1.414M7.05 7.05L5.636 5.636"
                  />
                </svg>
              ),
              text: 'Entrenamientos 100% adaptados a tus objetivos y estilo de vida'
            },
            {
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 10h4l3 8 4-16 3 8h4"
                  />
                </svg>
              ),
              text: 'Grupos selectos con atención personalizada y motivación constante'
            },
            {
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ),
              text: 'Seguimiento digital y feedback constante para maximizar tu evolución'
            }
          ].map(({ icon, text }, idx) => (
            <li
              key={idx}
              className="flex gap-5 items-start leading-relaxed font-semibold text-gray-800"
            >
              <div className="flex-shrink-0">{icon}</div>
              <span className="text-white">{text}</span>
            </li>
          ))}
        </ul>

        <p className="ml-12 text-sm text-gray-500 tracking-wide max-w-xs">
          Lo que hacemos es simple: transformar tu esfuerzo en progreso
          sostenible con un plan que entiende tus necesidades reales.
        </p>
      </div>
    </section>
  );
}
