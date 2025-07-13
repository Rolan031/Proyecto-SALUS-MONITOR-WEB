import { useRef, useEffect } from "react";
import { motion, useTransform, animate, useSpring, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import img1 from "../../assets/imagen1.jpeg";
import img2 from "../../assets/imagen2.jpeg";
import img3 from "../../assets/imagen3.jpeg";

function TiltCard({ theme, image, description }) {
  const ref = useRef(null);
  const x = useSpring(0.5, { stiffness: 300, damping: 30 });
  const y = useSpring(0.5, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(y, [0, 1], [10, -10]);
  const rotateY = useTransform(x, [0, 1], [-10, 10]);

  const controls = useAnimation();
  const animationInterval = useRef(null);
  const isHovering = useRef(false);

  const [inViewRef, inView] = useInView({ threshold: 0.5 });

  const setRefs = (node) => {
    ref.current = node;
    inViewRef(node);
  };

  const startAutoAnimation = () => {
    if (animationInterval.current) return;
    let toggle = true;
    animationInterval.current = setInterval(() => {
      animate(x, toggle ? 0.48 : 0.52, { duration: 1, ease: "easeInOut" });
      animate(y, toggle ? 0.48 : 0.52, { duration: 1, ease: "easeInOut" });
      toggle = !toggle;
    }, 1500);
  };

  const stopAutoAnimation = () => {
    if (animationInterval.current) {
      clearInterval(animationInterval.current);
      animationInterval.current = null;
    }
  };

  useEffect(() => {
    startAutoAnimation();
    return () => stopAutoAnimation();
  }, []);

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } });
    } else {
      controls.start({ opacity: 0, y: 50, transition: { duration: 0.3, ease: "easeIn" } });
    }
  }, [inView, controls]);

  const handleMouseMove = (e) => {
    if (!isHovering.current) {
      isHovering.current = true;
      stopAutoAnimation();
    }
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    x.set(px);
    y.set(py);
  };

  const handleMouseLeave = () => {
    isHovering.current = false;
    animate(x, 0.5, { type: "spring", stiffness: 200, damping: 20, duration: 0.3 });
    animate(y, 0.5, { type: "spring", stiffness: 200, damping: 20, duration: 0.3 });
    setTimeout(() => {
      if (!isHovering.current) {
        startAutoAnimation();
      }
    }, 300);
  };

  return (
    <motion.div
      ref={setRefs}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={controls}
      initial={{ opacity: 0, y: 50 }}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className="relative w-80 h-96 rounded-2xl overflow-hidden shadow-xl cursor-pointer max-w-xs mx-auto bg-white flex flex-col"
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(74, 133, 140, 0.45)" }}
    >
      <div className="absolute inset-0 w-full h-full z-0">
        <img
          src={image}
          alt={theme}
          className="w-full h-full object-cover pointer-events-none"
          draggable={false}
        />
      </div>

      <div className="relative z-10 flex flex-col justify-between h-full">
        <div className="absolute top-4 left-4 px-2 py-1 bg-white/70 rounded text-sm font-semibold text-gray-800 shadow">
          {theme}
        </div>
        <div className="absolute bottom-4 left-4 right-4 text-black text-xs p-2 rounded-md bg-white/80 backdrop-blur-md shadow">
          <p className="truncate whitespace-normal break-words">{description}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function ThreeCards() {
  const cards = [
    { 
      theme: "IOT", 
      image: img1,
      description: "Sistemas de Internet de las Cosas para automatización y control inteligente de dispositivos conectados."
    },
    { 
      theme: "CHATBOT", 
      image: img2,
      description: "Asistentes virtuales inteligentes que mejoran la experiencia del usuario y automatizan procesos de atención."
    },
    { 
      theme: "DESARROLLO", 
      image: img3,
      description: "Desarrollo de aplicaciones web y móviles con tecnologías modernas y mejores prácticas de programación."
    },
  ];

  return (
    <div className="py-8 px-4 flex flex-col md:flex-row flex-wrap gap-8 justify-center items-center">
      {cards.map((card, i) => (
        <TiltCard key={i} theme={card.theme} image={card.image} description={card.description} />
      ))}
    </div>
  );
}
