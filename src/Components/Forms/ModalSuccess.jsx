import React, { useEffect, useRef, useState } from 'react';
import logoUrban from '../../Images/staff/imgLogo.jpg';

const ModalSuccess = ({ isVisible, onClose, textoModal }) => {
  const [show, setShow] = useState(false);
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);

  // Fade-in animation control
  useEffect(() => {
    if (isVisible) {
      setShow(true);
      setTimeout(() => {
        if (closeButtonRef.current) closeButtonRef.current.focus();
      }, 100);
    } else {
      setShow(false);
    }
  }, [isVisible]);

  // Escape key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isVisible) return null;

  const handleOverlayClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  return (
    <div
      onClick={handleOverlayClick}
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{
        background:
          'radial-gradient(circle, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.05) 80%)',
        backdropFilter: 'blur(6px)'
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div
        ref={modalRef}
        className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 p-6 relative transition-all duration-300 ease-out"
        style={{
          opacity: show ? 1 : 0,
          transform: show ? 'translateY(0)' : 'translateY(-10px)'
        }}
      >
        <button
          ref={closeButtonRef}
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full"
          aria-label="Cerrar modal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 8.586l4.95-4.95a1 1 0 011.415 1.415L11.414 10l4.95 4.95a1 1 0 01-1.415 1.415L10 11.414l-4.95 4.95a1 1 0 01-1.415-1.415L8.586 10 3.636 5.05a1 1 0 011.415-1.415L10 8.586z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        {/* <p className='text-center'>SoftFusion desarrollo de software</p> */}
        <div className="mb-4 flex justify-center">
          <img
            src={logoUrban}
            alt="Logo Urban"
            className="w-28 sm:w-32 h-auto object-contain"
            loading="lazy"
          />
        </div>

        <hr className="border-gray-200 mb-4" />

        <p
          id="modal-description"
          className="uppercase titulo text-center text-blue-600 text-base leading-relaxed font-sans px-2"
        >
          {textoModal}
        </p>
      </div>
    </div>
  );
};

export default ModalSuccess;
