import React from "react";
import { Link } from "react-router-dom";
import { useVitalMonitorContext } from "../../contexts/VitalMonitorContext";
import VitalMonitor from "../common/vitalmonitor";
import SalusParticleBackground from "../SalusParticleBackground";
import ParticleBackground from "../ParticleBackground";

const MonitorPage = () => {
  const { state } = useVitalMonitorContext();

  if (!state.currentPatient) {
    return (
      <div className="salus-register-monitor min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
        {/* Partículas fluidas específicas para monitoreo */}
        <SalusParticleBackground />
        <ParticleBackground />
        
        <div className="text-center z-10">
          <div className="text-5xl text-green-400 mb-4">
            <i className="fas fa-user-slash"></i>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Paciente no registrado
          </h2>
          <p className="text-gray-400 mb-4">
            Por favor, registre un paciente primero para comenzar el monitoreo
          </p>
          <Link
            to="/register"
            className="inline-block mt-6 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors flex items-center gap-2"
          >
            <i className="fas fa-user-plus"></i>
            Ir al Registro
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="salus-register-monitor min-h-screen relative overflow-hidden">
      {/* Partículas fluidas específicas para monitoreo */}
      <SalusParticleBackground />
      <ParticleBackground />
      
      {/* Contenedor principal con z-index para estar sobre las partículas */}
      <div className="relative z-10 w-full h-full">
        <VitalMonitor patient={state.currentPatient} />
      </div>
    </div>
  );
};

export default MonitorPage;
