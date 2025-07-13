const RealTimeChart = ({ data, timeRange, isMonitoring }) => {
  const chartData = data.slice(-20);

  return (
    <div className="bg-gray-900/80 rounded-2xl shadow-xl p-6 border border-green-500/20 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-green-500/10 to-transparent"></div>
      </div>
      
      <div className="flex items-center justify-between mb-6 relative z-10">
        <h3 className="text-xl font-semibold text-white flex items-center">
          📊 Gráfico en Tiempo Real
        </h3>
        <div className="flex items-center">
          <div className={`w-3 h-3 rounded-full mr-2 ${isMonitoring ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`}></div>
          <span className="text-sm text-gray-300">
            {isMonitoring ? 'Activo' : 'Detenido'}
          </span>
        </div>
      </div>
      
      <div className="h-64 bg-gray-800/50 rounded-xl flex items-center justify-center relative overflow-hidden border border-green-500/10">
        {chartData.length > 0 ? (
          <div className="w-full h-full p-4 relative">
            <div className="absolute bottom-1/2 left-0 right-0 h-px bg-green-500/30"></div>
            <div className="text-center text-gray-400 mb-4 text-sm">
              Frecuencia Cardíaca - Últimos {chartData.length} registros
            </div>
            <div className="flex items-end justify-between h-32">
              {chartData.map((vital, index) => {
                const heightPercent = (vital.heartRate / 120) * 100;
                return (
                  <div key={vital.id} className="flex flex-col items-center w-8">
                    <div
                      className="w-1 bg-gradient-to-t from-green-400 to-green-600 rounded-t-full relative"
                      style={{ height: `${heightPercent}%`, minHeight: '4px' }}
                    >
                      <div className="absolute -top-1 -left-1 w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>
                    <span className="text-xs text-gray-500 mt-2">
                      {new Date(vital.timestamp).toLocaleTimeString().slice(0, 5)}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-4 px-2">
              <span>60 bpm</span>
              <span>90 bpm</span>
              <span>120 bpm</span>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500 relative z-10">
            <div className="text-5xl mb-4 text-green-400/30">💓</div>
            <p className="text-gray-400">No hay datos para mostrar</p>
            <p className="text-sm text-gray-500 mt-2">
              {isMonitoring ? 'Esperando datos del monitor...' : 'Inicia el monitoreo para ver el gráfico'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
export default RealTimeChart;
