import React from 'react';
import '../../../Styles/MetodsGet/GetUserId.css';
import whatsappIcon from '../../../Images/SVG/whatsapp.svg';
import { formatearFecha } from '../../../Helpers';

const LeadsDetails = ({ user, isOpen, onClose, setSelectedLeads }) => {
  if (!isOpen) return null;

  const handleClose = () => {
    if (user) setSelectedLeads(null);
    onClose();
  };

  // Función para limpiar y formatear el teléfono
  const formatPhoneForWhatsApp = (tel) => {
    if (!tel) return null;

    // Quitar espacios, guiones, paréntesis y signos
    let cleaned = tel.toString().replace(/\D/g, '');

    // Si ya empieza con 549 y tiene 13 dígitos, devolverlo tal cual
    if (cleaned.startsWith('549') && cleaned.length === 13) {
      return `+${cleaned}`;
    }

    // Si empieza con 9 y tiene 11 dígitos (ej: 93863531891), agregar el +54
    if (cleaned.startsWith('9') && cleaned.length === 11) {
      return `+54${cleaned}`;
    }

    // Si tiene 10 o 11 dígitos (ej: 3863531891 o 03863531891), agregar 549
    if (cleaned.length >= 10) {
      // Quitar el 0 si lo tiene al principio
      if (cleaned.startsWith('0')) cleaned = cleaned.slice(1);
      return `+549${cleaned}`;
    }

    return null; // si no puede formatearse
  };

  const formattedPhone = formatPhoneForWhatsApp(user.tel);
  const whatsappLink = formattedPhone
    ? `https://wa.me/${formattedPhone.replace('+', '')}`
    : null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="flex justify-between text-[20px] pb-4 items-center">
          <h2 className="titulo uppercase font-bignoodle tracking-wide text-[#1D4ED8]">
            Detalles del Lead
          </h2>
          <div
            className="pr-2 cursor-pointer font-semibold"
            onClick={handleClose}
          >
            x
          </div>
        </div>

        <p>
          <span className="font-semibold">ID:</span> {user.id}
        </p>
        <p>
          <span className="font-semibold">Nombre:</span> {user.nombre}
        </p>
        <p>
          <span className="font-semibold">Teléfono:</span> {user.tel}
        </p>
        <p>
          <span className="font-semibold">Comentario:</span> {user.mensaje}
        </p>
        <p>
          <span className="font-semibold">Fecha de Registración:</span>{' '}
          {formatearFecha(user.created_at)}
        </p>

        {whatsappLink && (
          <div className="flex justify-center mt-6">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-green-600 rounded-full hover:bg-green-700 transition shadow-lg"
            >
              <img src={whatsappIcon} alt="WhatsApp" className="w-6 h-6" />
              <span className="text-white font-medium">Contactar</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeadsDetails;
