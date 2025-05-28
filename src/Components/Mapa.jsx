import React from 'react';

export default function Mapa() {
  return (
    <section id="ubicacion" className="relative font-montserrat select-none">
      {/* Mapa full width y alto fijo */}
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3569.371447250796!2d-65.20033322559215!3d-26.82147147668627!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94225c18be94ad7f%3A0x61a1fd774f6f1f0!2sUrban%20Fitness%20Tucum%C3%A1n!5e0!3m2!1ses-419!2sar!4v1691428061543!5m2!1ses-419!2sar"
        className="w-full h-[500px] border-0"
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Mapa Urban Fitness Tucumán"
      />

      {/* Contenedor de contenido con fondo sutil y padding */}
      <div className="max-w-4xl mx-auto -mt-40 bg-white bg-opacity-90 backdrop-blur-md rounded-xl shadow-lg p-10 relative z-10">
        {/* Título con línea animada */}
        <div className="mb-8 text-center">
          <h2
            tabIndex={0}
            className="titulo uppercase text-4xl font-extrabold text-gray-900 relative inline-block cursor-default"
          >
            ¿Dónde estamos ubicados?
            <span
              aria-hidden="true"
              className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full transition-all duration-500 group-hover:w-full"
            />
          </h2>
          <div className="mt-2 h-1 w-24 bg-gradient-to-r from-blue-500 via-blue-500 to-blue-500 rounded-full mx-auto" />
        </div>

        {/* Info de contacto */}
        <div className="flex flex-col gap-8 text-gray-800 text-lg">
          <div className="flex items-start gap-5">
            <span className="text-3xl" role="img" aria-label="Ubicación">
              📍
            </span>
            <div>
              <p className="font-semibold text-xl">Urban Fitness Tucumán</p>
              <p>Monteagudo 778, San Miguel de Tucumán</p>
            </div>
          </div>

          <div className="flex items-center gap-5">
            <span className="text-3xl" role="img" aria-label="Teléfono">
              📞
            </span>
            <a
              href="tel:+543814123456"
              className="text-blue-600 hover:text-blue-800 underline transition-colors duration-300"
            >
              +54 381 412-3456
            </a>
          </div>

          <div className="flex items-center gap-5">
            <span
              className="text-3xl"
              role="img"
              aria-label="Correo electrónico"
            >
              ✉️
            </span>
            <a
              href="mailto:contacto@urbanfitness.com.ar"
              className="text-blue-600 hover:text-blue-800 underline break-words transition-colors duration-300"
            >
              contacto@urbanfitness.com.ar
            </a>
          </div>

          <p className="italic text-gray-500 text-base mt-6 max-w-sm">
            Horarios de atención: <br />
            Lunes a Viernes de 8:00 a 21:00 <br />
            Sábados de 9:00 a 14:00
          </p>
        </div>
      </div>
    </section>
  );
}
