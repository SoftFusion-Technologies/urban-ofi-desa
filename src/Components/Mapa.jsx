import React from 'react';

export default function Mapa() {
  return (
    <div
      className="flex flex-col md:flex-row lg:flex-row justify-center items-center mx-auto w-full transition-opacity duration-500"
      data-aos="fade-up"
      id="ubicacion"
    >
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3569.371447250796!2d-65.20033322559215!3d-26.82147147668627!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94225c18be94ad7f%3A0x61a1fd774f6f1f0!2sUrban%20Fitness%20Tucum%C3%A1n!5e0!3m2!1ses-419!2sar!4v1691428061543!5m2!1ses-419!2sar"
        width="100%"
        height="450"
        style={{ border: '0' }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
}
