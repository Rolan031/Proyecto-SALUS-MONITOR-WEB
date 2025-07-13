// Intro.jsx
import useLenis from "./uselenis";
import Logo from "../../assets/Logo2.png";
import imagen1 from "../../assets/imagen1.jpeg";
import imagen2 from "../../assets/imagen2.jpeg";
import imagen3 from "../../assets/imagen3.jpeg";
import imagen4 from "../../assets/imagen4.jpeg";
import imagenesp32_1 from "../../assets/imagenesp32-1.jpeg";
import imagenesp32_2 from "../../assets/imagenesp32-2.jpeg";
import imagenesp32_3 from "../../assets/imagenesp32-3.jpeg";
import imagenesp32_4 from "../../assets/imagenesp32-4.jpeg";
import imagenesp32_5 from "../../assets/imagenesp32-5.jpeg";
import imagenesp32_6 from "../../assets/imagenesp32-6.jpeg";
import imgFondoIntro from "../../assets/1._Design3x redimensionado no back.png";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { useRef } from "react";

const SECTION_HEIGHT = 1500;

const Intro = ({ onStart }) => {
  useLenis();
  return (
    <div className="relative min-h-screen w-full bg-black overflow-x-hidden">
      <Nav onStart={onStart} />
      <Hero />
      <Schedule />
    </div>
  );
};

const Nav = ({ onStart }) => {
  const handleGoToMain = () => {
    onStart?.();
  };

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-3 text-white bg-zinc-950/80 backdrop-blur">
      <h1 className="text-2xl font-bold text-white">GRUPO 6</h1>
      <button
        onClick={handleGoToMain}
        className="flex items-center gap-1 text-sm text-zinc-400 hover:text-white transition"
      >
        Ir al proyecto <FiArrowRight />
      </button>
    </nav>
  );
};

const Hero = () => {
  return (
    <div className="relative w-full">
      {/* Imágenes decorativas ESP32 animadas */}
      <Esp32Decorativas />
      <div
        style={{ height: `calc(${SECTION_HEIGHT}px + 100vh)` }}
        className="relative w-full"
      >
        <CenterImage />
        <ParallaxImages />
        <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-b from-zinc-950/0 to-zinc-950" />
      </div>
      <div style={{ height: `${SECTION_HEIGHT}px` }} />
    </div>
  );
};

const Esp32Decorativas = () => {
  // Array de imágenes y posiciones
  const decorativas = [
    { src: imagenesp32_1, style: { top: '10%', left: '-5%', width: 120, rotate: -10 } },
    { src: imagenesp32_2, style: { top: '20%', right: '-6%', width: 110, rotate: 12 } },
    { src: imagenesp32_3, style: { bottom: '12%', left: '8%', width: 115, rotate: 8 } },
    { src: imagenesp32_4, style: { bottom: '10%', right: '10%', width: 130, rotate: -14 } },
    { src: imagenesp32_5, style: { top: '55%', left: '-4%', width: 110, rotate: 6 } },
    { src: imagenesp32_6, style: { bottom: '5%', left: '40%', width: 125, rotate: 0 } },
  ];
  return (
    <>
      {decorativas.map((img, i) => (
        <motion.img
          key={i}
          src={img.src}
          alt={`esp32 decorativo ${i+1}`}
          initial={{ opacity: 0, scale: 0.7, rotate: img.style.rotate }}
          animate={{ opacity: 0.7, scale: 1, rotate: img.style.rotate + 8 * Math.sin(i) }}
          transition={{ duration: 1.2, delay: 0.2 + i * 0.15, yoyo: Infinity, repeat: Infinity, repeatType: 'reverse' }}
          style={{
            position: 'absolute',
            zIndex: 2,
            pointerEvents: 'none',
            ...img.style
          }}
          className="drop-shadow-lg rounded-xl"
        />
      ))}
    </>
  );
};

const CenterImage = () => {
  const { scrollY } = useScroll();
  const clip1 = useTransform(scrollY, [0, 1500], [25, 0]);
  const clip2 = useTransform(scrollY, [0, 1500], [75, 100]);

  const clipPath = useMotionTemplate`polygon(${clip1}% ${clip1}%, ${clip2}% ${clip1}%, ${clip2}% ${clip2}%, ${clip1}% ${clip2}%)`;
  const backgroundSize = 'contain';
  const opacity = useTransform(
    scrollY,
    [SECTION_HEIGHT, SECTION_HEIGHT + 500],
    [0.7, 0]
  );

  return (
    <motion.div
      className="sticky top-0 h-screen w-full"
      style={{
        clipPath,
        backgroundSize,
        opacity,
        backgroundImage: `url(${imgFondoIntro})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    />
  );
};

const ParallaxImages = () => {
  return (
    <div className="mx-auto max-w-5xl px-4 pt-[200px]">
      <ParallaxImg
        src={imagenesp32_1}
        alt="imagen 1"
        start={-200}
        end={200}
        className="w-1/3"
      />
      <ParallaxImg
        src={imagenesp32_2}
        alt="imagen2"
        start={200}
        end={-250}
        className="mx-auto w-2/3"
      />
      <ParallaxImg
        src={imagenesp32_3}
        alt="imagen3"
        start={-200}
        end={200}
        className="ml-auto w-1/3"
      />
      <ParallaxImg
        src={imagenesp32_6}
        alt="img4"
        start={0}
        end={-500}
        className="ml-24 w-4/12"
      />
    </div>
  );
};

const ParallaxImg = ({ className, alt, src, start, end }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`${start}px end`, `end ${-end}px`],
  });

  const opacity = useTransform(scrollYProgress, [0.75, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0.75, 1], [1, 0.85]);
  const y = useTransform(scrollYProgress, [0, 1], [start, end]);
  const transform = useMotionTemplate`translateY(${y}px) scale(${scale})`;

  return (
    <motion.img
      src={src}
      alt={alt}
      className={className}
      ref={ref}
      style={{ transform, opacity }}
    />
  );
};

const Schedule = () => {
  const integrantes = [
    {
      nombre: "Anthony Garcia",
      color: "from-blue-500 to-cyan-500",
      imagen: "/SalusIMG/1._Design3x redimensionado no back.png"
    },
    {
      nombre: "Santiago Carranza",
      color: "from-green-500 to-emerald-500",
      imagen: "/SalusIMG/2-. Design@3x no back.png"
    },
    {
              nombre: "Jipson Gamboa",
      color: "from-purple-500 to-pink-500",
      imagen: "/SalusIMG/3-. Design@3x redimensionado no back.png"
    },
    {
      nombre: "Jean Otero",
      color: "from-orange-500 to-red-500",
      imagen: "/SalusIMG/Icono header redimensionado no back.png"
    },
    {
      nombre: "Rolando Avecillas",
      color: "from-yellow-500 to-orange-500",
      imagen: "/SalusIMG/MsgRespuesta no back.jpg"
    }
  ];

  return (
    <section
      id="launch-schedule"
      className="relative w-full min-h-screen text-white bg-gradient-to-b from-black via-zinc-900 to-black"
    >
      {/* Efecto de partículas de fondo */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-60 left-1/4 w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-80 right-1/3 w-1 h-1 bg-yellow-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute top-32 left-1/2 w-1 h-1 bg-red-400 rounded-full animate-pulse" style={{animationDelay: '1.5s'}}></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 pt-32 pb-20">
        <motion.div
          initial={{ y: 48, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ ease: "easeInOut", duration: 0.75 }}
          className="text-center mb-16"
        >
          <h1 className="text-7xl font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 mb-4">
            INTEGRANTES
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Equipo de desarrollo del proyecto SALUS - Sistema de Monitoreo de Signos Vitales
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {integrantes.map((integrante, index) => (
            <motion.div
              key={integrante.nombre}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="relative bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-2xl p-6 hover:border-zinc-700 transition-all duration-300 hover:transform hover:scale-105">
                {/* Gradiente de fondo */}
                <div className={`absolute inset-0 bg-gradient-to-br ${integrante.color} opacity-10 rounded-2xl group-hover:opacity-20 transition-opacity duration-300`}></div>
                
                {/* Contenido */}
                <div className="relative z-10">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-28 h-28 flex items-center justify-center bg-transparent">
                      <img
                        src={integrante.imagen}
                        alt={integrante.nombre}
                        className="max-w-full max-h-full object-contain mx-auto drop-shadow-lg"
                        style={{display: 'block'}}
                      />
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white text-center mb-2">
                    {integrante.nombre}
                  </h3>
                  
                  {/* Efecto de brillo en hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${integrante.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Intro;
