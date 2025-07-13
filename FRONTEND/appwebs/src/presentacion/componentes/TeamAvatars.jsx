import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import chatbotrobot1 from '../../assets/chabotrobot1.jpg';
import esp32 from '../../assets/esp32.jpg';

const members = [
  {
    name: 'Anthony Garcia',
    role: 'Frontend (React, Tailwind, Recharts)',
    img: 'https://img.freepik.com/premium-psd/robot-toon-serie-14_1163333-218.jpg', // robot toon
  },
  {
    name: 'Santiago Carranza',
    role: 'Backend (Node.js, Express, Prisma, WebSockets)',
    img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg', // Prisma
  },
  {
<<<<<<< HEAD
            name: 'Jipson Gamboa',
=======
    name: 'Jipson Gamboa',
>>>>>>> 1e0f0a6bbda84cdf36b372c342d0471047de884c
    role: 'Frontend Avanzado (React Hooks, Axios, Framer Motion)',
    img: 'https://static.vecteezy.com/system/resources/previews/027/969/512/large_2x/robot-character-pose-illustration-happy-robot-jumping-and-cheering-design-vector.jpg', // robot animado
  },
  {
    name: 'Jean Otero',
    role: 'Chatbot (React, Algoritmos de análisis)',
    img: chatbotrobot1, // imagen local chatbot
  },
  {
    name: 'Rolando Avecillas',
    role: 'IoT/ESP32 (C++, WebSockets, MAX30102)',
    img: esp32, // imagen local esp32.jpg
  },
];

export default function TeamAvatars() {
  const [current, setCurrent] = useState(0);

  const handlePrev = () => setCurrent((prev) => (prev === 0 ? members.length - 1 : prev - 1));
  const handleNext = () => setCurrent((prev) => (prev === members.length - 1 ? 0 : prev + 1));

  return (
    <div className="mb-12 w-full">
      {/* Desktop: todos los avatares en fila */}
      <div className="hidden md:flex justify-center gap-8">
        {members.map((m, i) => (
          <motion.div
            key={m.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, delay: i * 0.12, ease: 'easeOut' }}
            className="flex flex-col items-center group transition-transform duration-300 hover:-translate-y-2 hover:scale-110"
          >
            <span className="w-24 h-24 mb-2 rounded-full border-4 border-white shadow-lg transition-all duration-300 group-hover:shadow-blue-300/60 group-hover:border-blue-400 group-hover:ring-4 group-hover:ring-blue-200/40 flex items-center justify-center bg-white overflow-hidden">
              <img
                src={m.img}
                alt={m.name}
                className="w-full h-full object-cover"
              />
            </span>
            <span className="font-bold text-lg mt-1 drop-shadow-sm group-hover:text-blue-400 transition-colors duration-300">{m.name}</span>
            <span className="text-sm text-sky-100 opacity-80 text-center max-w-[10rem] group-hover:text-blue-200 transition-colors duration-300">{m.role}</span>
          </motion.div>
        ))}
      </div>
      {/* Mobile: carrusel con flechas */}
      <div className="md:hidden flex items-center justify-center gap-4 w-full">
        <button
          onClick={handlePrev}
          className="p-2 rounded-full bg-white/80 text-blue-900 shadow hover:bg-blue-100 transition disabled:opacity-50"
          aria-label="Anterior"
        >
          <FaChevronLeft size={24} />
        </button>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, delay: current * 0.12, ease: 'easeOut' }}
          className="flex flex-col items-center group transition-transform duration-300 hover:-translate-y-2 hover:scale-110"
        >
          <span className="w-24 h-24 mb-2 rounded-full border-4 border-white shadow-lg transition-all duration-300 group-hover:shadow-blue-300/60 group-hover:border-blue-400 group-hover:ring-4 group-hover:ring-blue-200/40 flex items-center justify-center bg-white overflow-hidden">
            <img
              src={members[current].img}
              alt={members[current].name}
              className="w-full h-full object-cover"
            />
          </span>
          <span className="font-bold text-lg mt-1 drop-shadow-sm group-hover:text-blue-400 transition-colors duration-300">{members[current].name}</span>
          <span className="text-sm text-sky-100 opacity-80 text-center max-w-[10rem] group-hover:text-blue-200 transition-colors duration-300">{members[current].role}</span>
        </motion.div>
        <button
          onClick={handleNext}
          className="p-2 rounded-full bg-white/80 text-blue-900 shadow hover:bg-blue-100 transition disabled:opacity-50"
          aria-label="Siguiente"
        >
          <FaChevronRight size={24} />
        </button>
      </div>
    </div>
  );
} 