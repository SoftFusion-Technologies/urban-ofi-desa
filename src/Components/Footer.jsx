import { useEffect, useContext } from 'react';
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaArrowUp,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaEnvelope
} from 'react-icons/fa';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

const WhatsAppLink = ({ number }) => (
  <a
    href={`https://wa.me/${number.replace(/\D/g, '')}`}
    target="_blank"
    rel="noopener noreferrer"
    className="group inline-flex items-center gap-3 text-gray-200 hover:text-white transition-all duration-300 hover:translate-x-2"
  >
    <span className="bg-blue-600 p-2 rounded-lg group-hover:bg-blue-500 transition-colors duration-300">
      <FaWhatsapp className="text-xl" />
    </span>
    ¡Chatea con nosotros!
  </a>
);

const Footer = () => {
  // Usa el contexto para abrir el modal de contacto
  const navigate = useNavigate();
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '50px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('appear');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el, index) => {
      el.style.animationDelay = `${index * 0.2}s`;
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScroll = (to, adress) => {
    if (window.location.pathname !== `/${adress}`) {
      navigate(`/${adress}`);
      setTimeout(() => {
        const section = document.getElementById(to);
        if (section) {
          const offset = -100;
          const elementPosition =
            section.getBoundingClientRect().top + window.scrollY + offset;
          window.scrollTo({ top: elementPosition, behavior: 'smooth' });
        }
      }, 300);
    } else {
      const section = document.getElementById(to);
      if (section) {
        const offset = -100;
        const elementPosition =
          section.getBoundingClientRect().top + window.scrollY + offset;
        window.scrollTo({ top: elementPosition, behavior: 'smooth' });
      }
    }
  };

  const socialLinks = [
    {
      icon: FaFacebook,
      url: 'https://www.facebook.com/urbanfitnesstucuman/',
      label: 'Facebook'
    },
    {
      icon: FaInstagram,
      url: 'https://www.instagram.com/urbanfitnesstucuman/',
      label: 'Instagram'
    }
  ];

  const quickLinks = [
    {
      label: 'Entrenadores',
      onClick: () => handleScroll('entrenadores', ''),
      link: true
    },
    {
      label: 'Horarios',
      onClick: () => handleScroll('instalaciones', 'instalaciones'),
      link: true
    },
    {
      label: 'Contacto',
      onClick: () => setIsContactOpen(true)
    }
  ];

  const contactInfo = [
    {
      icon: FaWhatsapp,
      label: '¡Chatea con nosotros!',
      href: 'https://wa.me/5493813643118',
      type: 'whatsapp'
    },
    {
      icon: FaMapMarkerAlt,
      label: 'Ver Ubicación',
      href: 'https://www.google.com/maps/place/Urban+Fitness+Tucum%C3%A1n/@-26.8214715,-65.204764,2057m/data=!3m1!1e3!4m10!1m2!2m1!1surban+fitness!3m6!1s0x94225c18be94ad7f:0x61a1fd774f6f1f0!8m2!3d-26.8214715!4d-65.1979087!15sCg11cmJhbiBmaXRuZXNzkgEDZ3ltqgFJEAEqESINdXJiYW4gZml0bmVzcygOMh8QASIb74ruIfZICCnawJCGJi3_kcoXeqaubYHxQk5eMhEQAiINdXJiYW4gZml0bmVzc-ABAA!16s%2Fg%2F11dx9gpt6f?entry=ttu&g_ep=EgoyMDI1MDUyMS4wIKXMDSoASAFQAw%3D%3D',
      type: 'link'
    },
    {
      icon: FaEnvelope,
      label: 'contacto@urbanfitness.com',
      href: 'mailto:contacto@urbanfitness.com',
      type: 'email'
    }
  ];

  return (
    <footer className=" relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-300">
      <div className="h-1 bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">
          <div className="md:col-span-5 animate-on-scroll">
            <h2 className="titulo text-4xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-blue-800 bg-clip-text text-transparent">
              Urban Fitness
            </h2>
            <p className="text-lg mb-8 leading-relaxed text-gray-300">
              Impulsá tu mejor versión. Entrená en un espacio diseñado para vos,
              con coaches expertos, equipamiento de vanguardia y clases
              dinámicas que se adaptan a todos los niveles. ¡Tu transformación
              empieza hoy!
            </p>
            <h3 className="text-xl font-semibold text-white mb-2 relative">
              <span className="relative z-10">Visita nuestras redes</span>
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-blue-600"></span>
            </h3>
            <div className="flex gap-6">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                  aria-label={social.label}
                >
                  <div className="bg-gray-800 p-3 rounded-lg group-hover:bg-blue-600 transition-all duration-300 transform hover:scale-110">
                    <social.icon className="text-2xl" />
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-3 animate-on-scroll">
            <h3 className="text-xl font-semibold text-white mb-6 relative">
              <span className="relative z-10">Enlaces Rápidos</span>
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-blue-600"></span>
            </h3>
            <ul className="space-y-4">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  {link.link ? (
                    <RouterLink
                      to={link.href || '#'}
                      onClick={
                        link.onClick
                          ? (e) => {
                              e.preventDefault();
                              link.onClick();
                            }
                          : null
                      }
                      className="group flex items-center gap-3 hover:text-white transition-all duration-300 hover:translate-x-2"
                    >
                      <span className="h-1.5 w-1.5 bg-blue-600 rounded-full group-hover:w-3 transition-all duration-300"></span>
                      {link.label}
                    </RouterLink>
                  ) : (
                    <a
                      href={link.href || '#'} // Usa `link.href` o un valor por defecto
                      onClick={
                        link.onClick
                          ? (e) => {
                              e.preventDefault(); // Evita el comportamiento por defecto
                              link.onClick(); // Ejecuta la función de scroll o modal
                            }
                          : null
                      }
                      className="group flex items-center gap-3 hover:text-white transition-all duration-300 hover:translate-x-2"
                    >
                      <span className="h-1.5 w-1.5 bg-blue-600 rounded-full group-hover:w-3 transition-all duration-300"></span>
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4 animate-on-scroll">
            <h3 className="text-xl font-semibold text-white mb-6 relative">
              <span className="relative z-10">Contáctanos</span>
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-blue-600"></span>
            </h3>
            <ul className="space-y-6">
              {contactInfo.map((contact, index) => (
                <li key={index}>
                  {contact.type === 'whatsapp' ? (
                    <WhatsAppLink number={contact.href.split('wa.me/')[1]} />
                  ) : (
                    <a
                      href={contact.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-3 hover:text-white transition-all duration-300 hover:translate-x-2"
                    >
                      <span className="bg-blue-600 p-2 rounded-lg group-hover:bg-blue-500 transition-colors duration-300">
                        <contact.icon className="text-xl" />
                      </span>
                      {contact.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center text-sm text-gray-400">
            <div className="text-center md:text-left">
              © 2025 SoftFusion. Todos los derechos reservados.
            </div>
            <div className="text-center">
              <a
                href="https://softfusion.com.ar/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors duration-300"
              >
                Desarrollado por SoftFusion
              </a>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-500 text-white p-4 rounded-full shadow-lg hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900"
      >
        <FaArrowUp className="text-lg" />
      </button>
    </footer>
  );
};

export default Footer;
