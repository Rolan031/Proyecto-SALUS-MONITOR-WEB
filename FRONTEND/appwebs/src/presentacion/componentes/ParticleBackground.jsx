import { useEffect, useRef } from 'react';

// Singleton optimizado para React con Tailwind
class ParticleManager {
  constructor() {
    this.container = null;
    this.initialized = false;
    this.componentCount = 0;
    this.particles = [];
    this.rafId = null;
    this.cleanup = this.cleanup.bind(this);
  }

  increment() {
    this.componentCount++;
  }

  decrement() {
    this.componentCount--;
    if (this.componentCount <= 0) {
      // Delay la limpieza para evitar problemas con React StrictMode
      setTimeout(() => this.cleanup(), 0);
    }
  }

  getContainer() {
    return this.container;
  }

  isInitialized() {
    return this.initialized && this.container && document.body.contains(this.container);
  }

  init() {
    if (this.isInitialized()) {
      return this.container;
    }

    this.cleanup();

    const containerId = 'particle-bg-container';
    const count = 50;

    // Crear contenedor con clases Tailwind
    this.container = document.createElement('div');
    this.container.id = containerId;
    this.container.className = 'fixed inset-0 w-screen h-screen pointer-events-none overflow-hidden z-[9999]';
    
    // Optimización GPU
    this.container.style.willChange = 'transform';

    // Insertar CSS optimizado
    this.insertAnimationCSS();

    // Crear partículas usando DocumentFragment para mejor rendimiento
    this.createParticles(count);

    // Insertar en DOM
    document.body.appendChild(this.container);

    this.initialized = true;
    return this.container;
  }

  insertAnimationCSS() {
    const styleId = 'particle-animations';
    
    // Remover estilos anteriores
    const existingStyle = document.getElementById(styleId);
    if (existingStyle) {
      existingStyle.remove();
    }

    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      @keyframes particleFloat {
        0% {
          transform: translate3d(0, 0, 0);
          opacity: 0;
        }
        10% {
          opacity: 0.6;
        }
        90% {
          opacity: 0.6;
        }
        100% {
          transform: translate3d(var(--drift), -100vh, 0);
          opacity: 0;
        }
      }
      
      .particle-item {
        animation: particleFloat linear infinite;
        will-change: transform, opacity;
        backface-visibility: hidden;
        perspective: 1000px;
      }
      
      @media (prefers-reduced-motion: reduce) {
        .particle-item {
          animation: none;
          opacity: 0.3;
        }
      }
    `;
    
    document.head.appendChild(style);
  }

  createParticles(count) {
    const fragment = document.createDocumentFragment();
    this.particles = [];
    
    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      
      // Usar clases Tailwind para estilos base
      particle.className = 'particle-item absolute w-0.5 h-0.5 bg-white/60 rounded-full';
      
      // Propiedades dinámicas con CSS variables
      const drift = Math.random() * 200 - 100;
      const delay = Math.random() * 8;
      const duration = 8 + Math.random() * 8;
      
      particle.style.cssText = `
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation-delay: ${delay}s;
        animation-duration: ${duration}s;
        --drift: ${drift}px;
      `;

      fragment.appendChild(particle);
      this.particles.push(particle);
    }

    this.container.appendChild(fragment);
  }

  cleanup() {
    // Cancelar cualquier animación pendiente
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }

    // Limpiar partículas
    if (this.particles.length > 0) {
      this.particles.forEach(particle => {
        if (particle.parentNode) {
          particle.style.animationPlayState = 'paused';
        }
      });
      this.particles = [];
    }

    // Remover contenedor
    if (this.container && this.container.parentNode) {
      try {
        this.container.parentNode.removeChild(this.container);
      } catch (error) {
        console.warn('Error removing particle container:', error);
      }
      this.container = null;
    }

    // Limpiar CSS
    const animations = document.getElementById('particle-animations');
    if (animations && animations.parentNode) {
      try {
        animations.parentNode.removeChild(animations);
      } catch (error) {
        console.warn('Error removing particle animations:', error);
      }
    }

    // Resetear estado
    this.initialized = false;
    this.componentCount = 0;
  }

  // Método para verificar si el contenedor sigue siendo válido
  isContainerValid() {
    return this.container && 
           document.body.contains(this.container) && 
           this.container.parentNode === document.body;
  }
}

// Instancia global
const particleManager = new ParticleManager();

// Cleanup global al cerrar la página
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => {
    particleManager.cleanup();
  });

  // Cleanup adicional para hot reload en desarrollo
  if (process.env.NODE_ENV === 'development') {
    window.addEventListener('beforeunload', () => {
      particleManager.cleanup();
    });
  }
}

const ParticleBackground = () => {
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    particleManager.increment();
    
    // Verificar si el contenedor existente sigue siendo válido
    if (!particleManager.isContainerValid()) {
      particleManager.cleanup();
    }
    
    // Obtener o crear contenedor
    particleManager.init();

    // Cleanup function
    return () => {
      isMountedRef.current = false;
      particleManager.decrement();
    };
  }, []);

  // Efecto adicional para manejar cambios de visibilidad
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Pausar animaciones cuando la página no es visible
        if (particleManager.container) {
          particleManager.particles.forEach(particle => {
            particle.style.animationPlayState = 'paused';
          });
        }
      } else {
        // Reanudar animaciones cuando la página vuelve a ser visible
        if (particleManager.container && isMountedRef.current) {
          particleManager.particles.forEach(particle => {
            particle.style.animationPlayState = 'running';
          });
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return null;
};

export default ParticleBackground;