import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const ScrollDots = ({ sections, activeSection, setActiveSection }) => {
  const isScrolling = useRef(false);

  useEffect(() => {
    if (!sections || !setActiveSection) return;

    const handleWheel = (e) => {
      e.preventDefault();
      if (isScrolling.current) return;

  const currentIndex = sections.findIndex((s) => s.id === activeSection);
      const direction = e.deltaY > 0 ? 1 : -1;
      const nextIndex = currentIndex + direction;

      if (nextIndex >= 0 && nextIndex < sections.length) {
        isScrolling.current = true;
        const nextSection = sections[nextIndex];
        const element = document.getElementById(nextSection.id);

        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
          setActiveSection(nextSection.id); 
        }

        setTimeout(() => {
          isScrolling.current = false;
        }, 1200);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [activeSection, sections, setActiveSection]);

  const handleDotClick = (sectionId) => {
    if (isScrolling.current) return;

    isScrolling.current = true;
    const element = document.getElementById(sectionId);

    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(sectionId);
    }

    setTimeout(() => {
      isScrolling.current = false;
    }, 800);
  };

  if (!sections?.length) return null;

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center space-y-4">
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => handleDotClick(section.id)}
          className="group relative focus:outline-none"
          aria-label={`Ir a ${section.label}`}
          aria-current={activeSection === section.id ? "true" : "false"}
        >
          <motion.div
            className={`w-3 h-3 rounded-full cursor-pointer ${
              activeSection === section.id
                ? "bg-blue-500 scale-125"
                : "bg-gray-400 hover:bg-gray-300"
            } transition-all duration-300`}
            whileHover={{ scale: 1.5 }}
            whileTap={{ scale: 0.95 }}
          />
          <span className="absolute right-6 top-1/2 -translate-y-1/2 bg-black/80 text-white text-xs px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
            {section.label}
          </span>
        </button>
      ))}
    </div>
  );
};

export default ScrollDots;
