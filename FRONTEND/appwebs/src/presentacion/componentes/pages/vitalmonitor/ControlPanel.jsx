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
    <div className="bg-gray-900/80 rounded-2xl shadow-xl p-6 mb-6 border border-green-500/20 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-green-500/10 to-transparent"></div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between relative z-10">
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

        <div className="flex flex-col sm:flex-row items-center gap-4 text-sm">
          <div className="flex items-center">
            <div
              className={`w-3 h-3 rounded-full mr-2 ${
                isMonitoring ? 'bg-green-500 animate-pulse' : 'bg-gray-500'
              }`}
            ></div>
            <span className="text-gray-300">
              Estado:{' '}
              {isMonitoring ? (
                <span className="text-green-400 font-semibold">Monitoreando</span>
              ) : (
                <span className="text-gray-400">Detenido</span>
              )}
            </span>
          </div>
          
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
    </div>
  );
};

export default ControlPanel;
