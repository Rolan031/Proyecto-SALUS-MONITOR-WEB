import React, { useState, useEffect } from "react"; 
import PersonajeImg from '../../assets/1._Design3x redimensionado no back.png'; 
import { motion } from "framer-motion";
import Logo from '../../assets/Logo.png';
import { useNavigate } from 'react-router-dom';

const slideUp = (delay) => {
  return {
    initial: {
      y: 60,
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: delay,
        ease: [0.25, 0.25, 0.25, 0.75],
      },
    },
  };
};

const Personaje = () => {
  const [showContent, setShowContent] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const halfScreen = window.innerHeight * 0.4;

      if (currentScrollY > lastScrollY && currentScrollY > halfScreen) {
        setShowContent(false);
      } else {
        setShowContent(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <section className="flex justify-center mt-20 md:mt-10">
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 w-full"
        initial={{ opacity: 1, y: 0 }}
        animate={showContent ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <div className="p-6 sm:p-8 md:p-10 lg:p-16 xl:p-20">
          <motion.img
            variants={slideUp(0.4)}
            initial="initial"
            animate="animate"
            src={Logo}
            alt="logo del Juego"
            className="mb-4"
          />
          <motion.p
            variants={slideUp(0.4)}
            initial="initial"
            animate="animate"
            className="py-10 text-white text-base md:text-xl leading-relaxed" 
          >
            Salus Monitor es una plataforma innovadora para el monitoreo en tiempo real de signos vitales, diseñada para mejorar la atención y el seguimiento de pacientes mediante tecnología IoT. Facilita la toma de decisiones clínicas y ofrece herramientas intuitivas.
          </motion.p>
          <motion.div
            variants={slideUp(1.1)}
            initial="initial"
            animate="animate"
            className="flex justify-center gap-6"
          >
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              onClick={() => navigate('/register')}
              className="py-3 px-14 rounded-full text-white font-bold shadow-lg hover:scale-110 hover:shadow-2xl transition-all duration-300 flex items-center cursor-pointer text-xl relative overflow-hidden group"
              style={{
                background: 'linear-gradient(135deg, rgba(86,128,150,1), rgba(73,120,128,1), rgba(16,51,79,1))',
                border: 'none',
              }}
            >
              <span className="relative z-10">Comenzar</span>
              <i className="ml-3 bi bi-controller text-2xl relative z-10"></i>
              <span className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-white rounded-full blur-sm transition-opacity duration-300"></span>
            </motion.button>
          </motion.div>
        </div>

        <div className="p-2 sm:p-4 md:p-6 lg:p-8 xl:p-10 flex justify-center items-center">
         <motion.img
  src={PersonajeImg}
  alt="Personaje"
  className="w-full h-auto max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl cursor-pointer transition-all duration-500 ease-out hover:scale-105 hover:shadow-xl"
  style={{
    WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent)',
    maskImage: 'linear-gradient(to top, black 80%, transparent)',
    WebkitMaskRepeat: 'no-repeat',
    maskRepeat: 'no-repeat',
  }}
  animate={{
    y: [0, -15, 0],
  }}
  transition={{
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut",
  }}
  whileHover={{
    scale: 1.05,
    rotate: 2,
    transition: { 
      duration: 0.6,
      ease: "easeOut"
    }
  }}
/>

        </div>
      </motion.div>
    </section>
  );
};

export default Personaje;