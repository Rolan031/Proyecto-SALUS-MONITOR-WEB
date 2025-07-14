import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Intro from '../Intro';
import Navbar from '../navbar';
import Personaje from '../Personaje';
import ThreeCards from '../Card';
import ScrollDots from '../ScrollDots';
import FONDO from '../../../assets/fondo2.png'; 
import TeamAvatars from '../TeamAvatars';
import TechIcons from '../TechIcons';
import { FaUsers } from 'react-icons/fa';

// Animación global usada por el componente Personaje
const slideUp = (delay) => ({
  initial: { y: 60, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      delay,
      ease: [0.25, 0.25, 0.25, 0.75],
    },
  },
});
window.slideUp = slideUp;

function HomePage() {
  const [showIntro, setShowIntro] = useState(true); // Mostrar Intro primero
  const [activeSection, setActiveSection] = useState('home');

  const sections = [
    { id: 'home', label: 'Inicio' },
    { id: 'about', label: 'Acerca de' },
    { id: 'projects', label: 'Proyectos' },
  ];

  const handleStart = () => {
    setShowIntro(false);
    setActiveSection('home');
  };

  return (
    <div className="relative min-h-screen">
      {/* Fondo global */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${FONDO})`, backgroundAttachment: 'fixed' }}
      />
      <div className="fixed inset-0 z-0 bg-black/20" />

      <AnimatePresence mode="wait">
        {showIntro ? (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="relative z-10"
          >
            <Intro onStart={handleStart} />
          </motion.div>
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="relative z-10"
          >
            <Navbar />
            <ScrollDots
              sections={sections}
              activeSection={activeSection}
              setActiveSection={setActiveSection}
            />

            <main>
              {/* Sección Home con gradiente */}
              <section
                id="home"
                className="min-h-screen flex items-center justify-center relative"
                style={{
                  background: 'linear-gradient(135deg, rgba(86, 128, 150, 0.7), rgba(73, 120, 128, 0.62), rgba(16, 51, 79, 0.55))',
                }}
              >
                <Personaje />
              </section>

              {/* Sección About con gradiente */}
              <section
                id="about"
                className="min-h-screen flex flex-col items-center justify-center text-white relative"
                style={{
                  background: 'linear-gradient(135deg, rgba(95, 130, 156, 0.7), rgba(73, 120, 128, 0.62), rgba(16, 51, 79, 0.55))',
                }}
              >
                <div className="text-center max-w-4xl mx-auto px-6 relative z-10">
                  <div className="flex items-center justify-center gap-4 mt-12 mb-2">
                    <FaUsers className="text-5xl drop-shadow text-[#1e3a8a]" />
                  <motion.h2
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl md:text-6xl font-extrabold font-poppins text-white drop-shadow-lg"
                  >
                    Acerca de Nosotros
                      <span className="block h-1 w-2/3 mx-auto mt-2 bg-gradient-to-r from-sky-400 via-cyan-400 to-sky-700 rounded-full animate-pulse"></span>
                  </motion.h2>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="bg-white/60 backdrop-blur-md shadow-xl rounded-3xl border border-white/30 p-10 mb-12 max-w-3xl mx-auto text-center flex flex-col items-center transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-100 hover:via-blue-200 hover:to-blue-300 hover:shadow-2xl"
                  >
                    <p className="text-xl leading-relaxed text-gray-900 font-bold tracking-wide" style={{
                      textShadow: '0 0 8px rgba(0, 0, 0, 0.1), 0 0 16px rgba(0, 0, 0, 0.05)',
                    }}>
                      Nos apasiona la tecnología y la innovación. Ayudamos a personas y empresas a llevar sus ideas al siguiente nivel, creando soluciones inteligentes en desarrollo web, IoT e inteligencia artificial. Combinamos creatividad, experiencia y trabajo en equipo para transformar desafíos en experiencias digitales útiles, atractivas y únicas.
                    </p>
                  </motion.div>
                  <TeamAvatars />
                </div>
              </section>

              {/* Sección Projects con gradiente */}
              <section
                id="projects"
                className="min-h-screen flex items-center justify-center text-white relative"
                style={{
                  background: 'linear-gradient(135deg, rgba(88, 124, 153, 0.7), rgba(73, 120, 128, 0.62), rgba(16, 51, 79, 0.55))',
                }}
              >
                <div className="w-full relative z-10">
                  <motion.h2
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="text-5xl font-bold text-center mb-12 drop-shadow-lg"
                  >
                    TECNOLOGIAS UTILIZADAS
                  </motion.h2>
                  <ThreeCards />
                  <TechIcons />
                </div>
              </section>
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default HomePage; 