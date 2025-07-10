import React from 'react';

export const SessionInfo = ({ session, patient, vitalsCount, isMonitoring }) => {
  const getSessionDuration = () => {
    if (!session?.startTime) return '00:00:00';
    
    const start = new Date(session.startTime);
    const end = session.endTime ? new Date(session.endTime) : new Date();
    const duration = Math.floor((end - start) / 1000);
    
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    const seconds = duration % 60;
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-gray-900/80 rounded-2xl shadow-xl p-6 mb-6 border border-green-500/20 relative overflow-hidden">
      {/* Efecto de fondo */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-green-500/10 to-transparent"></div>
      </div>
      
      <h3 className="text-xl font-semibold text-white mb-6 flex items-center relative z-10">
        <i className="fas fa-info-circle mr-3 text-green-400"></i>
        Información de la Sesión
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
        {[
          { label: 'ID Sesión', value: session?.id || 'N/A', color: 'text-blue-400', icon: 'fa-hashtag' },
          { label: 'Duración', value: getSessionDuration(), color: 'text-green-400', icon: 'fa-clock' },
          { label: 'Registros', value: vitalsCount, color: 'text-purple-400', icon: 'fa-database' },
          { label: 'Estado', value: isMonitoring ? 'ACTIVO' : 'INACTIVO', color: isMonitoring ? 'text-green-400' : 'text-gray-400', icon: isMonitoring ? 'fa-play-circle' : 'fa-stop-circle' }
        ].map((item, index) => (
          <div key={index} className="text-center p-4 bg-gray-800/50 rounded-xl border border-gray-700">
            <div className={`text-3xl font-bold ${item.color} mb-2`}>
              <i className={`fas ${item.icon} mr-2`}></i>
              {item.value}
            </div>
            <div className="text-sm text-gray-400">{item.label}</div>
          </div>
        ))}
      </div>
      
      {session?.startTime && (
        <div className="mt-6 text-sm text-gray-400 relative z-10">
          <p className="flex items-center">
            <i className="fas fa-play mr-2 text-green-400"></i>
            Inicio: {new Date(session.startTime).toLocaleString()}
          </p>
          {session.endTime && (
            <p className="flex items-center mt-2">
              <i className="fas fa-stop mr-2 text-red-400"></i>
              Fin: {new Date(session.endTime).toLocaleString()}
            </p>
          )}
        </div>
      )}
    </div>
  );
};
export default SessionInfo;