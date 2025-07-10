import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { VitalMonitorProvider } from './presentacion/contexts/VitalMonitorContext';
import RegisterPage from './presentacion/componentes/pages/RegisterPage';
import MonitorPage from './presentacion/componentes/pages/MonitorPage';
import ParticleBackground from './presentacion/componentes/ParticleBackground';
import './index.css'; 


function App() {
  return (
    <VitalMonitorProvider>
      <Router>
        {/* Partículas biomédicas flotantes */}
        <ParticleBackground />

        {/* Contenedor general con estilo de fondo */}
        <div className="min-h-screen bg-gray-950 text-white p-4 relative z-10">
          <Routes>
            <Route path="/" element={<RegisterPage />} />
            <Route path="/monitor" element={<MonitorPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </VitalMonitorProvider>
  );
}

export default App;
