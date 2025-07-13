import { useEffect, useRef } from 'react';

// Singleton para controlar las partículas Salus globalmente
let globalSalusContainer = null;
let globalSalusInitialized = false;
let globalAnimationId = null;
let salusComponentCount = 0;

const SalusParticleBackground = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    salusComponentCount++;

    // Si ya están inicializadas globalmente, solo referenciar
    if (globalSalusInitialized && globalSalusContainer) {
      containerRef.current = globalSalusContainer;
      return;
    }

    // Verificar si ya hay partículas funcionando
    if (container.children.length > 0) {
      globalSalusContainer = container;
      globalSalusInitialized = true;
      return;
    }

    // Configuración de partículas
    const particleCount = 60;
    const particles = [];

    // Crear partículas
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      // Posición inicial aleatoria
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      
      // Animación personalizada para cada partícula
      const duration = 12 + Math.random() * 8; // 12-20 segundos
      const delay = Math.random() * 6; // 0-6 segundos de retraso
      
      particle.style.animationDuration = `${duration}s`;
      particle.style.animationDelay = `${delay}s`;
      
      // Variaciones de tamaño y opacidad
      const size = 2 + Math.random() * 3; // 2-5px
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      // Opacidad variable
      const opacity = 0.4 + Math.random() * 0.4; // 0.4-0.8
      particle.style.opacity = opacity;
      
      container.appendChild(particle);
      particles.push(particle);
    }

    // Función para animación adicional de movimiento
    const animateParticles = () => {
      particles.forEach((particle, index) => {
        // Movimiento adicional basado en el tiempo
        const time = Date.now() * 0.001;
        const x = Math.sin(time + index * 0.1) * 20;
        const y = Math.cos(time + index * 0.15) * 15;
        
        particle.style.transform = `translate(${x}px, ${y}px)`;
      });
      
      globalAnimationId = requestAnimationFrame(animateParticles);
    };

    // Iniciar animación
    globalAnimationId = requestAnimationFrame(animateParticles);

    globalSalusContainer = container;
    globalSalusInitialized = true;

    // Cleanup
    return () => {
      salusComponentCount--;
      
      // Solo limpiar si no hay más componentes activos
      if (salusComponentCount <= 0) {
        if (globalAnimationId) {
          cancelAnimationFrame(globalAnimationId);
          globalAnimationId = null;
        }
        if (container && container.children.length > 0) {
          container.innerHTML = '';
          globalSalusInitialized = false;
          globalSalusContainer = null;
        }
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="particle-container"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 1
      }}
    />
  );
};

export default SalusParticleBackground; 