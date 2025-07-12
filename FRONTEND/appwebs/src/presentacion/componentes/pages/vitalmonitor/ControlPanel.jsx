import React, { useState } from 'react';
import vitalsApi from '../../../../infrastructure/api/vitalsApi.js';

const ControlPanel = ({ isMonitoring, onToggleMonitoring, patient, vitals }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const handleSave = async () => {
    if (!vitals || vitals.length === 0) {
      setSaveMessage('No hay datos para guardar');
      setTimeout(() => setSaveMessage(''), 3000);
      return;
    }

    setIsSaving(true);
    setSaveMessage('');

    try {
      const latestVital = vitals[vitals.length - 1];
      const vitalData = {
        patientId: patient.id,
        heartRate: latestVital.heartRate,
        timestamp: latestVital.timestamp,
        notes: 'Guardado manualmente desde la interfaz web'
      };

      await vitalsApi.saveManualVitalData(vitalData);
      setSaveMessage('✅ Datos guardados correctamente');
    } catch (error) {
      setSaveMessage(`❌ Error: ${error.message || 'Error de conexión'}`);
    } finally {
      setIsSaving(false);
      setTimeout(() => setSaveMessage(''), 5000);
    }
  };
  return (
    <div className="bg-[#181e2a] rounded-2xl shadow-xl p-0 m-0 border-none relative overflow-hidden">
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center relative z-10">
        <div className="flex gap-4 flex-wrap">
          <button
            onClick={onToggleMonitoring}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg ${
              isMonitoring
                ? 'bg-red-600 hover:bg-red-700 text-white shadow-red-500/30'
                : 'bg-green-600 hover:bg-green-700 text-white shadow-green-500/30'
            }`}
          >
            {isMonitoring ? '⏹️ Detener Monitoreo' : '▶️ Iniciar Monitoreo'}
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving || !vitals || vitals.length === 0}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg ${
              isSaving || !vitals || vitals.length === 0
                ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/30'
            }`}
          >
            {isSaving ? '💾 Guardando...' : '💾 Guardar Datos'}
          </button>
        </div>
        {/* Mensaje de guardado, si aplica */}
        {saveMessage && (
          <div className={`px-4 py-2 rounded-lg text-sm font-medium ${
            saveMessage.includes('✅') 
              ? 'bg-green-500/20 text-green-300 border border-green-500/30'
              : 'bg-red-500/20 text-red-300 border border-red-500/30'
          }`}>
            {saveMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default ControlPanel;
