import React, { useEffect, useState } from 'react';

export default function Hero() {
  // animacion tipo "typewriter" para el titulo
  function Typewriter({ text, speed = 100 }) {
    const [displayedText, setDisplayedText] = useState('');
    useEffect(() => {
      let index = 0;
      const interval = setInterval(() => {
        setDisplayedText(text.slice(0, index + 1));
        index++;
        if (index === text.length) clearInterval(interval);
      }, speed);
      return () => clearInterval(interval);
    }, [text, speed]);
    return <span>{displayedText}</span>;
  }

  // contador con animacion pulso suave
  function Counter({ end, suffix = '', duration = 2000 }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
      let start = 0;
      const stepTime = 30;
      const increment = end / (duration / stepTime);
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, stepTime);
      return () => clearInterval(timer);
    }, [end, duration]);

    return (
      <span className="counter">
        {count}
        {suffix}
      </span>
    );
  }

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center px-4 md:px-10 text-white overflow-hidden"
      style={{ scrollMarginTop: '80px' }}
      id="hero"
    >
      {/* Fondo y overlays */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80")',
          filter: 'brightness(0.75) blur(4px)',
          transform: 'scale(1.05)',
          animation: 'slowMove 20s ease-in-out infinite alternate'
        }}
      ></div>
      <div className="absolute inset-0 bg-gray-900/70"></div>

      {/* Contenido */}
      <div className="relative z-10 max-w-4xl mx-auto text-center pt-32 sm:pt-36 md:pt-40 px-4 sm:px-0 animate-fadeIn">
        <h1
          className="titulo mt-10 text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 leading-tight tracking-wide uppercase"
          // style={{ fontFamily: "'Montserrat Black', sans-serif" }}
        >
          <Typewriter text="Transforma tu cuerpo y mente" speed={70} />
        </h1>

        <p
          className="cuerpo text-base sm:text-lg mb-12 px-2 sm:px-0 font-light max-w-3xl mx-auto text-gray-300 tracking-wide leading-relaxed"
          // style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          Liberá tu viaje Urban Fitness. Unite a la comunidad fitness más
          dinámica de la ciudad. Equipamiento de última generación, entrenadores
          expertos y programas innovadores para superar tus límites.
        </p>

        <div className="titulo flex flex-col sm:flex-row justify-center gap-8 mb-20 px-2 sm:px-0">
          <button className="btn-outline w-full sm:w-auto">
            Empezá tu prueba gratis
          </button>
          <button className="btn-filled w-full sm:w-auto">
            Solicitar Turno Bicicleta
          </button>
        </div>

        {/* Stats */}
        <div className="titulo flex flex-col sm:flex-row justify-center gap-20 text-lg font-medium tracking-wide">
          <div className="animate-pulseSoft text-center">
            <Counter end={50} suffix="+" />
            <br />
            Clases únicas
          </div>
          <div className="animate-pulseSoft text-center">
            <Counter end={15} suffix="+" />
            <br />
            Entrenadores expertos
          </div>
          <div className="animate-pulseSoft text-center">
            <Counter end={30} suffix="+" />
            <br />
            Equipos de Última Generación
          </div>
        </div>
      </div>

      {/* Estilos */}
      <div jsx="true">
        <style jsx>{`
          @keyframes slowMove {
            0% {
              background-position: center top;
            }
            100% {
              background-position: center bottom;
            }
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          .animate-fadeIn {
            animation: fadeIn 1.2s ease forwards;
          }

          @keyframes pulseSoft {
            0%,
            100% {
              opacity: 1;
              transform: scale(1);
            }
            50% {
              opacity: 0.85;
              transform: scale(1.03);
            }
          }

          .animate-pulseSoft {
            animation: pulseSoft 3s ease-in-out infinite;
          }

          .btn-outline {
            border: 2px solid #2563eb; /* azul Royal */
            color: #2563eb;
            padding: 12px 32px;
            font-weight: 600;
            border-radius: 8px;
            background: transparent;
            transition: all 0.3s ease;
            cursor: pointer;
            font-family: 'Montserrat', sans-serif;
          }
          .btn-outline:hover {
            background-color: #2563eb;
            color: white;
            transform: scale(1.05);
            box-shadow: 0 6px 12px rgba(37, 99, 235, 0.6);
          }

          .btn-filled {
            background-color: #094385; /* azul claro pastel */
            color: white; /* azul oscuro */
            padding: 12px 32px;
            font-weight: 600;
            border-radius: 8px;
            border: none;
            transition: all 0.3s ease;
            cursor: pointer;
            font-family: 'Montserrat', sans-serif;
          }
          .btn-filled:hover {
            background-color: #0a1b9b; /* azul medio */
            transform: scale(1.05);
            box-shadow: 0 6px 12px rgba(96, 165, 250, 0.5);
          }

          .counter {
            font-family: 'Montserrat Black', sans-serif;
            font-size: 2.5rem;
            color: #0951a9; /* azul medio */
          }
        `}</style>
      </div>
    </section>
  );
}
