import  { useState, useEffect } from "react";
import Logo from "../../assets/Logo2.png";
import {  easeOut, motion } from "framer-motion";

const navbarlinks = [
  { id: 1, title: "Inicio", link: "#" },
  { id: 2, title: "Acerca de", link: "#" },
  { id: 3, title: "Chatbot", link: "#" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Mostrar solo si está subiendo y cerca del inicio (scrollY < 200)
      if (currentScrollY < lastScrollY && currentScrollY < 200) {
        setShowNavbar(true);
      } else {
        setShowNavbar(false);
        if (isOpen) setIsOpen(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, isOpen]);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: showNavbar ? 1 : 0, y: showNavbar ? 0 : -50 }}
      transition={{ duration: 0.3, ease: easeOut }}
      className="fixed top-0 left-0 w-full bg-white/10 backdrop-blur-md z-50 transition-all duration-300"
    >
      <div className="flex justify-between items-center sm:px-8 sm:py-3 px-4 py-2">
        <div className="flex items-center gap-2">
          <img src={Logo} alt="Logo" className="w-16 h-auto" />
        </div>

        <button
          onClick={toggleMenu}
          className="md:hidden flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        <div className="hidden md:block">
          <ul className="flex sm:space-x-8 space-x-4">
            {navbarlinks.map((link) => (
              <li key={link.id}>
                <a
                  className="sm:text-lg text-white font-bold tracking-wider hover:text-sky-200 transition-all duration-300 hover:scale-110 transform inline-block relative group"
                  href={link.link}
                >
                  <span className="relative z-10">{link.title}</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 opacity-0 group-hover:opacity-20 rounded-lg blur-sm transition-opacity duration-300"></span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen && showNavbar ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className={`md:hidden absolute w-full backdrop-blur-sm bg-white/30 ${
          isOpen && showNavbar ? "visible" : "invisible"
        }`}
      >
        <ul className="flex flex-col px-4 py-2">
          {navbarlinks.map((link) => (
            <li key={link.id} className="py-2 text-center">
              <a
                className="text-white font-bold tracking-wider hover:text-sky-200 transition-all duration-300 hover:scale-105 transform inline-block"
                href={link.link}
                onClick={() => setIsOpen(false)}
              >
                {link.title}
              </a>
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;
