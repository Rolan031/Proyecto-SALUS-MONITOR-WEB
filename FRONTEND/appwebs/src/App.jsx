import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { VitalMonitorProvider } from './presentacion/contexts/VitalMonitorContext';
import HomePage from './presentacion/componentes/pages/HomePage';
import RegisterPage from './presentacion/componentes/pages/RegisterPage';
import MonitorPage from './presentacion/componentes/pages/MonitorPage';
import ParticleBackground from './presentacion/componentes/ParticleBackground';
import './index.css'; 

function App() {
  return (
    <VitalMonitorProvider>
      <Router>
        {/* Partículas biomédicas flotantes - solo para HomePage */}
        <ParticleBackground />

        {/* Contenedor general - sin fondo para permitir estilos específicos */}
        <div className="min-h-screen text-white relative z-10">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/monitor" element={<MonitorPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </VitalMonitorProvider>
  );
}

export default App;
