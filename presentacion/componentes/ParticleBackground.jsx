import { useEffect } from 'react';

const ParticleBackground = () => {
  useEffect(() => {
    const count = 80;
    const containerId = 'particle-container';

    if (document.getElementById(containerId)) return;

    const container = document.createElement('div');
    container.id = containerId;
    container.style.position = 'fixed';
    container.style.top = 0;
    container.style.left = 0;
    container.style.width = '100vw';
    container.style.height = '100vh';
    container.style.zIndex = '9999'; // ahora encima de todo
    container.style.pointerEvents = 'none';
    document.body.appendChild(container);

    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      p.style.left = `${Math.random() * 100}%`;
      p.style.top = `${Math.random() * 100}%`;
      p.style.animationDelay = `${Math.random() * 6}s`;
      p.style.animationDuration = `${4 + Math.random() * 6}s`;
      container.appendChild(p);
    }

    return () => {
      const existing = document.getElementById(containerId);
      if (existing) document.body.removeChild(existing);
    };
  }, []);

  return null;
};

export default ParticleBackground;
