import { Dumbbell, ClipboardCheck, UserCheck } from 'lucide-react';
import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import img from '../../Images/personalizado.webp';

const ParticlesBackground = () => {
  useEffect(() => {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    const particlesCount = 80;
    const particles = [];

    for (let i = 0; i < particlesCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.2,
        speedY: (Math.random() - 0.5) * 0.2
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0 || p.x > width) p.speedX *= -1;
        if (p.y < 0 || p.y > height) p.speedY *= -1;

        const gradient = ctx.createRadialGradient(
          p.x,
          p.y,
          0,
          p.x,
          p.y,
          p.size * 6
        );
        gradient.addColorStop(0, 'rgba(96, 165, 250, 0.8)');
        gradient.addColorStop(1, 'rgba(96, 165, 250, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        ctx.fill();
      }

      requestAnimationFrame(animate);
    };

    animate();

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <canvas
      id="particles-canvas"
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{
        background: 'linear-gradient(180deg, #000011 0%, #001122 100%)'
      }}
    />
  );
};

const SocioRutina = () => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      boxShadow: [
        '0 0 12px 0 rgba(59, 130, 246, 0.8)',
        '0 0 24px 6px #193158',
        '0 0 12px 0 rgba(59, 130, 246, 0.8)'
      ],
      transition: { duration: 3, repeat: Infinity, repeatType: 'mirror' }
    });
  }, [controls]);

  return (
    <>
      <ParticlesBackground />

      <section className="relative py-32 px-6 text-white overflow-hidden flex justify-center">
        <div className="max-w-7xl w-full glassmorphism p-12 rounded-3xl flex flex-col md:flex-row items-center gap-20">
          <motion.div
            className="md:w-1/2 space-y-10"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className="titulo text-5xl md:text-6xl font-extrabold leading-tight tracking-tight bg-gradient-to-r from-blue-400 via-blue-700 to-white text-transparent bg-clip-text drop-shadow-lg">
              SOCIO-RUTINA
            </h2>

            <p className="text-lg text-blue-100 leading-relaxed">
              Conectamos{' '}
              <strong className="text-white">ciencia del deporte</strong>,
              tecnología y{' '}
              <strong className="text-white">dedicación humana</strong> para
              acompañarte en tu transformación. Rutinas personalizadas,
              seguimiento real, y todo desde nuestra app.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <ClipboardCheck className="text-blue-400 w-7 h-7 mt-1 drop-shadow-md" />
                <span className="text-blue-100 text-base">
                  Planificación semanal hecha para tu cuerpo, tu mente y tu
                  meta.
                </span>
              </div>
              <div className="flex items-start gap-4">
                <UserCheck className="text-blue-400 w-7 h-7 mt-1 drop-shadow-md" />
                <span className="text-blue-100 text-base">
                  Feedback profesional constante. Nunca entrenás solo/a.
                </span>
              </div>
              <div className="flex items-start gap-4">
                <Dumbbell className="text-blue-400 w-7 h-7 mt-1 drop-shadow-md" />
                <span className="text-blue-100 text-base">
                  Visualizá tus rutinas desde la app con total claridad.
                </span>
              </div>
            </div>

            <motion.button
              animate={controls}
              whileTap={{ scale: 0.95 }}
              className="mt-10 px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-500 hover:to-blue-700 text-white rounded-full font-bold shadow-lg transition-transform"
            >
              Quiero transformar mi rutina
            </motion.button>
          </motion.div>

          <motion.div
            className="md:w-1/2 relative"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            style={{ perspective: 800 }}
          >
            <motion.img
              src={img}
              alt="Entrenamiento personalizado"
              className="rounded-3xl shadow-2xl border-[6px] border-blue-600 hover:shadow-blue-500/50 transition-shadow duration-500"
              whileHover={{ rotateY: 8, rotateX: 4, scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 100 }}
              draggable={false}
            />
            <div className="absolute -inset-1 rounded-3xl bg-blue-500 opacity-10 blur-2xl pointer-events-none" />
          </motion.div>
        </div>
      </section>

      <style jsx>{`
        .glassmorphism {
          background: rgba(10, 15, 44, 0.6);
          backdrop-filter: saturate(180%) blur(20px);
          box-shadow: 0 8px 32px 0 rgba(59, 130, 246, 0.4);
          border: 1px solid rgba(59, 130, 246, 0.25);
        }
      `}</style>
    </>
  );
};

export default SocioRutina;
