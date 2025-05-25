import { motion, useMotionValue, useTransform } from 'framer-motion';
import {
  Dumbbell,
  Bike,
  Flame,
  Heart,
  Shield,
  Music,
  Feather,
  Activity,
  Zap
} from 'lucide-react';

const activities = [
  {
    name: 'Funcional',
    description: 'Entrenamiento completo para fuerza, agilidad y resistencia.',
    icon: <Dumbbell className="w-10 h-10 text-blue-700" />
  },
  {
    name: 'Spinning',
    description: 'Cardio intenso sobre bicicleta con música y energía.',
    icon: <Bike className="w-10 h-10 text-blue-700" />
  },
  {
    name: 'BodyPump',
    description: 'Tonificá tu cuerpo con barras y pesas en grupo.',
    icon: <Flame className="w-10 h-10 text-blue-700" />
  },
  {
    name: 'Zumba',
    description: 'Baile y ejercicio en una clase llena de ritmo y alegría.',
    icon: <Music className="w-10 h-10 text-blue-700" />
  },
  {
    name: 'Boxeo',
    description: 'Mejorá reflejos y fuerza con técnicas de boxeo real.',
    icon: <Shield className="w-10 h-10 text-blue-700" />
  },
  {
    name: 'Rumba',
    description: 'Ritmos latinos y movimiento enérgico para liberar estrés.',
    icon: <Zap className="w-10 h-10 text-blue-700" />
  },
  {
    name: 'Yoga',
    description: 'Conectá cuerpo y mente con posturas y respiración.',
    icon: <Feather className="w-10 h-10 text-blue-700" />
  },
  {
    name: 'BodyGap',
    description: 'Fortalecé piernas, glúteos y abdomen con intensidad.',
    icon: <Activity className="w-10 h-10 text-blue-700" />
  },
  {
    name: 'AeroBox',
    description: 'Cardio con golpes de boxeo, energía y diversión total.',
    icon: <Heart className="w-10 h-10 text-blue-700" />
  }
];

const iconAnimations = {
  Funcional: { y: [0, -10, 0] }, // pequeño "bounce" arriba y abajo
  Spinning: { rotate: [0, 15, -15, 15, 0] }, // rotación oscilante
  BodyPump: { scale: [1, 1.2, 1] }, // zoom in-out
  Zumba: { rotate: [0, 10, -10, 10, 0] }, // rotación oscilante
  Boxeo: { x: [0, 10, -10, 10, 0] }, // movimiento horizontal de boxeo
  Rumba: { rotate: [0, 15, -15, 15, 0] }, // rotación oscilante
  Yoga: { scale: [1, 1.1, 1] }, // leve zoom
  BodyGap: { y: [0, -10, 0] }, // bounce vertical
  AeroBox: { scale: [1, 1.1, 1] } // zoom leve
};

// Array con datos aleatorios para cada estrella (posición, tamaño, duración animaciones)
const stars = Array.from({ length: 35 }, () => ({
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  size: Math.random() * 2 + 1.5, // en px
  animationDuration: Math.random() * 5 + 5, // segundos para órbita completa
  twinkleDuration: Math.random() * 3 + 2, // segundos para destello
  twinkleDelay: Math.random() * 3 // delay para destello
}));

// Componente Hover3DCard para efecto 3D en hover
function Hover3DCard({ children }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Girar máximo 15 grados en x y y según posición del mouse dentro del div
  const rotateX = useTransform(y, [50, -50], [-15, 15]);
  const rotateY = useTransform(x, [-50, 50], [-15, 15]);

  function handleMouseMove(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    const px = event.clientX - rect.left - rect.width / 2;
    const py = event.clientY - rect.top - rect.height / 2;
    x.set(px);
    y.set(py);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      style={{ rotateX, rotateY, transformPerspective: 600 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="will-change-transform"
    >
      {children}
    </motion.div>
  );
}

export default function UrbanActivitiesSection() {
  return (
    <section className="relative bg-gradient-to-br from-[#0a0f2c] via-[#111d4a] to-[#0a0f2c] py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="stars-container">
        {stars.map((star, i) => (
          <div
            key={i}
            className="star-orbit"
            style={{
              top: star.top,
              left: star.left,
              width: star.size * 6 + 'px',
              height: star.size * 6 + 'px',
              animationDuration: `${star.animationDuration}s`,
              animationDelay: `${Math.random() * star.animationDuration}s`
            }}
          >
            <div
              className="star"
              style={{
                width: star.size + 'px',
                height: star.size + 'px',
                animationDuration: `${star.twinkleDuration}s`,
                animationDelay: `${star.twinkleDelay}s`
              }}
            />
          </div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto text-center z-10 relative">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 tracking-tight uppercase">
          Lo que <span className="text-blue-700">Urban</span> tiene para vos
        </h2>
        <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
          Una comunidad, múltiples formas de entrenar. Descubrí la que va con
          vos.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {activities.map((activity, index) => (
            <Hover3DCard key={index}>
              <motion.div
                className="group relative h-52 bg-white rounded-2xl p-6 flex flex-col items-center justify-center shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 ease-in-out overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl z-0" />

                <motion.div
                  className="mb-3 z-10"
                  whileHover={{
                    ...iconAnimations[activity.name],
                    transition: {
                      duration: 1,
                      repeat: Infinity,
                      repeatType: 'loop'
                    }
                  }}
                >
                  {activity.icon}
                </motion.div>

                <h3 className="text-xl font-semibold text-blue-700 z-10">
                  {activity.name}
                </h3>
                <p className="absolute bottom-6 text-sm text-gray-500 px-4 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center max-w-xs z-10">
                  {activity.description}
                </p>
              </motion.div>
            </Hover3DCard>
          ))}
        </div>
      </div>
    </section>
  );
}
