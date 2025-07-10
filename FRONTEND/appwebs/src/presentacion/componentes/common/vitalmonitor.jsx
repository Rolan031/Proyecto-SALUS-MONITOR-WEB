import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useVitalData from '../pages/vitalmonitor/hooks/useVitalData';
import VitalSignCard from '../common/VitalSignCard';
import ControlPanel from '../pages/vitalmonitor/ControlPanel';
import SessionInfo from '../pages/vitalmonitor/SessionInfo';
import RealTimeChart from '../pages/vitalmonitor/RealTimeChart';

const VitalMonitor = ({ patient }) => {
  const {
    vitals,
    currentSession,
    isMonitoring,
    isWsConnected,
    error,
    startMonitoring,
    stopMonitoring,
  } = useVitalData(patient.id);

  const [notification, setNotification] = useState(null);

  const latestVital = vitals.length > 0 ? vitals[vitals.length - 1] : null;

  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  const handleToggleMonitoring = async () => {
    try {
      if (isMonitoring) {
        await stopMonitoring();
        showNotification('Monitoreo detenido correctamente', 'info');
      } else {
        await startMonitoring();
        showNotification('Monitoreo iniciado correctamente', 'success');
      }
    } catch (error) {
      showNotification('Error al cambiar estado de monitoreo', 'error');
    }
  };

  const getVitalStatus = (value, type) => {
    if (!value) return 'normal';
    const ranges = {
      heartRate: { min: 60, max: 100 }
    };

    const range = ranges[type];
    if (!range) return 'normal';
    if (value < range.min) return 'low';
    if (value > range.max) return 'high';
    return 'normal';
  };

  const getFilteredVitals = () => {
    if (!vitals.length) return [];
    // Mostrar todos los datos disponibles sin filtro de tiempo
    return vitals;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6 relative overflow-y-auto custom-scrollbar">
      {/* Efectos de fondo mejorados */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-30 bg-gradient-to-br from-transparent via-emerald-400/5 to-transparent"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-emerald-400/10 to-cyan-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"></div>
        </div>
      </div>

      
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.8 }}
            className={`fixed top-6 right-6 z-50 px-6 py-4 rounded-2xl shadow-2xl flex items-center backdrop-blur-xl border ${
              notification.type === 'error' ? 'bg-red-600/80 text-white border-red-500/50' :
              notification.type === 'success' ? 'bg-emerald-600/80 text-white border-emerald-500/50' :
              'bg-blue-600/80 text-white border-blue-500/50'
            }`}
          >
            <div className="text-2xl mr-3">
              {notification.type === 'error' ? '❌' : notification.type === 'success' ? '✅' : 'ℹ️'}
            </div>
            <span className="font-medium">{notification.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contenido principal */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header rediseñado */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 mb-8 border border-white/20"
        >
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
            <div className="flex items-center mb-6 lg:mb-0">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-2xl flex items-center justify-center mr-6 shadow-lg shadow-emerald-500/20">
                <span className="text-2xl">💓</span>
              </div>
              <div>
                <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-400 to-red-600 mb-2 font-poppins">
                  VitalCare Monitor
                </h1>
              </div>
            </div>
            
            <div className="flex items-center justify-end">
              <motion.div
                animate={{ scale: isWsConnected ? 1 : 0.95 }}
                className={`flex items-center px-6 py-3 rounded-2xl backdrop-blur-sm ${
                  isWsConnected 
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                    : 'bg-red-500/20 text-red-300 border border-red-500/30'
                } transition-all duration-300`}
              >
                <div className={`w-3 h-3 rounded-full mr-3 ${
                  isWsConnected ? 'bg-emerald-400 animate-pulse' : 'bg-red-400'
                }`}></div>
                <span className="font-semibold text-white">
                  {isWsConnected ? 'Conectado' : 'Desconectado'}
                </span>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Información del paciente rediseñada */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 mb-8 border border-white/20"
        >
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-400 rounded-3xl flex items-center justify-center mb-6 shadow-lg shadow-purple-500/20">
              <span className="text-3xl">👨‍⚕️</span>
            </div>
            
            <div className="w-full">
              <h2 className="text-6xl font-bold mb-8 text-center bg-gradient-to-r from-[#B983FF] via-[#9F7BFF] to-[#8EC5FC] bg-clip-text text-transparent">
                {patient.nombre}
              </h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white/5 rounded-2xl p-4 backdrop-blur-sm text-center">
                  <div className="text-5xl font-black mb-2 p-4 rounded inline-block bg-gradient-to-r from-[#66E4FF] to-[#A0FFF9] bg-clip-text text-transparent">
                    ID Paciente
                  </div>
                  <div className="text-white font-bold text-xl">{patient.id}</div>
                </div>
                <div className="bg-white/5 rounded-2xl p-4 backdrop-blur-sm text-center">
                  <div className="text-5xl font-black mb-2 p-4 rounded inline-block bg-gradient-to-r from-[#66E4FF] to-[#A0FFF9] bg-clip-text text-transparent">
                    Edad
                  </div>
                  <div className="text-white font-bold text-xl">{patient.edad} años</div>
                </div>
                <div className="bg-white/5 rounded-2xl p-4 backdrop-blur-sm text-center">
                  <div className="text-5xl font-black mb-2 p-4 rounded inline-block bg-gradient-to-r from-[#66E4FF] to-[#A0FFF9] bg-clip-text text-transparent">
                    Género
                  </div>
                  <div className="text-white font-bold text-xl">{patient.genero}</div>
                </div>
                <div className="bg-white/5 rounded-2xl p-4 backdrop-blur-sm text-center">
                  <div className="text-5xl font-black mb-2 p-4 rounded inline-block bg-gradient-to-r from-[#66E4FF] to-[#A0FFF9] bg-clip-text text-transparent">
                    Fecha
                  </div>
                  <div className="text-white font-bold text-xl">{new Date().toLocaleDateString()}</div>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <div className="flex items-center justify-center bg-emerald-500/20 backdrop-blur-sm px-6 py-3 rounded-2xl border border-emerald-500/30">
                <div className="w-4 h-4 bg-emerald-400 rounded-full mr-3 animate-pulse"></div>
                <span className="text-emerald-300 font-medium text-lg">
                  {isMonitoring ? 'Monitoreando' : 'Inactivo'}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Panel de control */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <ControlPanel
            isMonitoring={isMonitoring}
            onToggleMonitoring={handleToggleMonitoring}
            patient={patient}
            vitals={vitals}
          />
        </motion.div>

        {/* Grid principal mejorado */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
          {/* Gráfico en tiempo real */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="xl:col-span-2"
          >
            <RealTimeChart
              data={getFilteredVitals()}
              isMonitoring={isMonitoring}
            />
          </motion.div>

          {/* Tarjetas de signos vitales mejoradas */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 gap-6"
          >
            {latestVital ? (
              <>
                <VitalSignCard
                  title="Frecuencia Cardíaca"
                  value={latestVital.heartRate}
                  unit="bpm"
                  icon="❤️"
                  status={getVitalStatus(latestVital.heartRate, 'heartRate')}
                  timestamp={latestVital.timestamp}
                  trend={vitals.length > 1 ? 
                    (latestVital.heartRate > vitals[vitals.length - 2].heartRate ? 'up' : 'down') : 'stable'}
                />
                {/* Placeholder para más signos vitales */}
              
               
              </>
            ) : (
              <div className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20 text-center">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-6xl text-emerald-400/50 mb-6"
                >
                  💓
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-4 font-poppins">Sin datos vitales</h3>
                <p className="text-white text-lg mb-2">
                  {isMonitoring ? 'Esperando datos del monitor...' : 'Inicia el monitoreo para ver los signos vitales'}
                </p>
                <div className="w-full bg-white/10 rounded-full h-2 mt-4">
                  <div className="bg-gradient-to-r from-emerald-400 to-cyan-400 h-2 rounded-full animate-pulse" style={{width: '30%'}}></div>
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Información de sesión */}
        {currentSession && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-8"
          >
            <SessionInfo session={currentSession} />
          </motion.div>
        )}

        {/* Mensaje de error mejorado */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-500/20 backdrop-blur-xl border border-red-500/30 rounded-3xl p-8 mb-8 shadow-2xl"
          >
            <div className="flex items-center">
              <div className="w-16 h-16 bg-red-500/30 rounded-2xl flex items-center justify-center mr-6">
                <span className="text-3xl">⚠️</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-red-300 mb-2 font-poppins">Error de Conexión</h3>
                <p className="text-red-200 text-lg">{error}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Estadísticas mejoradas */}
        {vitals.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20"
          >
            <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-8 flex items-center font-poppins">
              <span className="text-3xl mr-4">📊</span>
              Estadísticas de la Sesión
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/10">
                <div className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                  {vitals.length}
                </div>
                <div className="text-white text-lg">Lecturas totales</div>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/10">
                <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                  {currentSession ? 
                    Math.round((new Date() - new Date(currentSession.startTime)) / (1000 * 60)) : 0}
                </div>
                <div className="text-white text-lg">Minutos de monitoreo</div>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/10">
                <div className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-2">
                  {vitals.filter(v => 
                    getVitalStatus(v.heartRate, 'heartRate') === 'high' ||
                    getVitalStatus(v.heartRate, 'heartRate') === 'low'
                  ).length}
                </div>
                <div className="text-white text-lg">Alertas generadas</div>
              </div>
            </div>
          </motion.div>
        )}
        
        {/* Espacio adicional para forzar scroll */}
        <div className="h-32"></div>
      </div>
    </div>
  );
};

export default VitalMonitor;