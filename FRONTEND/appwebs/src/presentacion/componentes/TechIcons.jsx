import React from 'react';
import { motion } from 'framer-motion';
import reactLogo from '../../assets/react.svg';

const techs = [
  {
    name: 'React',
    icon: reactLogo,
  },
  {
    name: 'Tailwind',
    icon: '', // Usar emoji de viento como placeholder
    emoji: '🌬️',
  },
  {
    name: 'Node.js',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
  },
  {
    name: 'Express.js',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
  },
  {
    name: 'Prisma',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg',
  },
  {
    name: 'C++ (Arduino)',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',
  },
  {
    name: 'MAX30102',
    icon: 'https://cdn-icons-png.flaticon.com/512/2622/2622337.png',
  },
];

export default function TechIcons() {
  return (
    <div className="flex flex-wrap justify-center gap-8 mb-12">
      {techs.map((t, i) => (
        <motion.div
          key={t.name}
          className="flex flex-col items-center group transition-transform duration-300 hover:-translate-y-2 hover:scale-110"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, delay: i * 0.12, ease: 'easeOut' }}
        >
          {t.icon ? (
            <span className="w-16 h-16 flex items-center justify-center mb-2 bg-white rounded-full shadow-lg transition-all duration-300 group-hover:shadow-blue-300/60 group-hover:ring-4 group-hover:ring-blue-200/40">
              <img
                src={t.icon}
                alt={t.name}
                className="w-10 h-10 object-contain transition-transform duration-300 group-hover:scale-125"
                loading="lazy"
              />
            </span>
          ) : t.emoji ? (
            <span className="w-16 h-16 flex items-center justify-center mb-2 bg-white rounded-full text-2xl border shadow-lg transition-all duration-300 group-hover:shadow-blue-300/60 group-hover:ring-4 group-hover:ring-blue-200/40">
              {t.emoji}
            </span>
          ) : (
            <span className="w-16 h-16 flex items-center justify-center mb-2 bg-white rounded-full text-gray-700 font-bold text-lg border shadow-lg transition-all duration-300 group-hover:shadow-blue-300/60 group-hover:ring-4 group-hover:ring-blue-200/40">
              {t.name[0]}
            </span>
          )}
          <span className="font-semibold text-base text-white drop-shadow-sm mt-1 text-center max-w-[5rem] group-hover:text-blue-200 transition-colors duration-300">
            {t.name}
          </span>
        </motion.div>
      ))}
    </div>
  );
} 