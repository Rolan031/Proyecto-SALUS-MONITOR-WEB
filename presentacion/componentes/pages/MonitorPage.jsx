import React from "react";
import { Link } from "react-router-dom";
import { useVitalMonitorContext } from "../../contexts/VitalMonitorContext";
import VitalMonitor from "../common/vitalmonitor";
const MonitorPage = () => {
  const { state } = useVitalMonitorContext();

  if (!state.currentPatient) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <div className="text-5xl text-green-400 mb-4">
            <i className="fas fa-user-slash"></i>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Paciente no registrado
          </h2>
          <p className="text-gray-400">
            Por favor, registre un paciente primero
          </p>
          <Link
            to="/"
            className="inline-block mt-6 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors"
          >
            <i className="fas fa-arrow-left mr-2"></i>
            Volver al Registro
          </Link>
        </div>
      </div>
    );
  }

  return <VitalMonitor patient={state.currentPatient} />;
};

export default MonitorPage;
