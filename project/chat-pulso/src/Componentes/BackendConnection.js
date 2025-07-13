import React from 'react';

function EstadisticasCard({ estadisticas, onLimpiar, onExportar }) {
  if (!estadisticas) return null;

  const formatNumber = (num) => {
    return num ? num.toLocaleString('es-ES') : '0';
  };

  const getStatusColor = (value, max) => {
    const percentage = (value / max) * 100;
    if (percentage > 80) return '#10b981';
    if (percentage > 60) return '#eab308';
    if (percentage > 40) return '#f97316';
    return '#ef4444';
  };

  return (
    <div style={{
      padding: '16px',
      background: 'rgba(31, 41, 55, 0.8)',
      borderRadius: '12px',
      border: '1px solid rgba(16, 185, 129, 0.2)',
      marginBottom: '16px'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '16px'
      }}>
        <h3 style={{
          margin: '0',
          fontSize: '18px',
          fontWeight: '600',
          color: '#f3f4f6',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          📊 Estadísticas del Chat
        </h3>
        
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={onLimpiar}
            style={{
              padding: '6px 12px',
              background: 'rgba(239, 68, 68, 0.1)',
              color: '#fca5a5',
              border: '1px solid rgba(239, 68, 68, 0.2)',
              borderRadius: '6px',
              fontSize: '12px',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(239, 68, 68, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(239, 68, 68, 0.1)';
            }}
          >
            🗑️ Limpiar
          </button>
          
          <button
            onClick={onExportar}
            style={{
              padding: '6px 12px',
              background: 'rgba(16, 185, 129, 0.1)',
              color: '#10b981',
              border: '1px solid rgba(16, 185, 129, 0.2)',
              borderRadius: '6px',
              fontSize: '12px',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(16, 185, 129, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(16, 185, 129, 0.1)';
            }}
          >
            📥 Exportar
          </button>
        </div>
      </div>

      {/* Métricas principales */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
        gap: '12px',
        marginBottom: '16px'
      }}>
        <div style={{
          padding: '12px',
          background: 'rgba(16, 185, 129, 0.1)',
          borderRadius: '8px',
          border: '1px solid rgba(16, 185, 129, 0.2)',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '24px',
            fontWeight: '700',
            color: '#10b981',
            marginBottom: '4px'
          }}>
            {formatNumber(estadisticas.totalAnalisis)}
          </div>
          <div style={{
            fontSize: '12px',
            color: '#9ca3af'
          }}>
            Análisis Totales
          </div>
        </div>

        <div style={{
          padding: '12px',
          background: 'rgba(59, 130, 246, 0.1)',
          borderRadius: '8px',
          border: '1px solid rgba(59, 130, 246, 0.2)',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '24px',
            fontWeight: '700',
            color: '#3b82f6',
            marginBottom: '4px'
          }}>
            {formatNumber(estadisticas.promedioFrecuencia)}
          </div>
          <div style={{
            fontSize: '12px',
            color: '#9ca3af'
          }}>
            Promedio BPM
          </div>
        </div>

        <div style={{
          padding: '12px',
          background: 'rgba(245, 158, 11, 0.1)',
          borderRadius: '8px',
          border: '1px solid rgba(245, 158, 11, 0.2)',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '24px',
            fontWeight: '700',
            color: '#f59e0b',
            marginBottom: '4px'
          }}>
            {formatNumber(estadisticas.maximaFrecuencia)}
          </div>
          <div style={{
            fontSize: '12px',
            color: '#9ca3af'
          }}>
            Máxima BPM
          </div>
        </div>

        <div style={{
          padding: '12px',
          background: 'rgba(139, 92, 246, 0.1)',
          borderRadius: '8px',
          border: '1px solid rgba(139, 92, 246, 0.2)',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '24px',
            fontWeight: '700',
            color: '#8b5cf6',
            marginBottom: '4px'
          }}>
            {formatNumber(estadisticas.minimaFrecuencia)}
          </div>
          <div style={{
            fontSize: '12px',
            color: '#9ca3af'
          }}>
            Mínima BPM
          </div>
        </div>
      </div>

      {/* Distribución por estado */}
      {estadisticas.distribucionEstados && (
        <div style={{ marginBottom: '16px' }}>
          <h4 style={{
            margin: '0 0 12px 0',
            fontSize: '14px',
            fontWeight: '600',
            color: '#f3f4f6'
          }}>
            📈 Distribución por Estado
          </h4>
          
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}>
            {Object.entries(estadisticas.distribucionEstados).map(([estado, cantidad]) => {
              const porcentaje = (cantidad / estadisticas.totalAnalisis) * 100;
              return (
                <div key={estado} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <div style={{
                    width: '80px',
                    fontSize: '12px',
                    color: '#d1d5db',
                    fontWeight: '500'
                  }}>
                    {estado}
                  </div>
                  
                  <div style={{
                    flex: '1',
                    height: '8px',
                    background: 'rgba(75, 85, 99, 0.3)',
                    borderRadius: '4px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: `${porcentaje}%`,
                      height: '100%',
                      background: getStatusColor(porcentaje, 100),
                      borderRadius: '4px',
                      transition: 'width 0.3s ease'
                    }} />
                  </div>
                  
                  <div style={{
                    width: '40px',
                    fontSize: '11px',
                    color: '#9ca3af',
                    textAlign: 'right'
                  }}>
                    {cantidad}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Información adicional */}
      <div style={{
        padding: '12px',
        background: 'rgba(15, 23, 42, 0.5)',
        borderRadius: '8px',
        border: '1px solid rgba(75, 85, 99, 0.2)'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '8px',
          fontSize: '12px'
        }}>
          <div>
            <span style={{ color: '#9ca3af' }}>Último análisis:</span>
            <span style={{ color: '#f3f4f6', marginLeft: '4px' }}>
              {estadisticas.ultimoAnalisis ? new Date(estadisticas.ultimoAnalisis).toLocaleString('es-ES') : 'N/A'}
            </span>
          </div>
          
          <div>
            <span style={{ color: '#9ca3af' }}>Rango de frecuencias:</span>
            <span style={{ color: '#f3f4f6', marginLeft: '4px' }}>
              {estadisticas.minimaFrecuencia} - {estadisticas.maximaFrecuencia} BPM
            </span>
          </div>
          
          <div>
            <span style={{ color: '#9ca3af' }}>Variabilidad:</span>
            <span style={{ color: '#f3f4f6', marginLeft: '4px' }}>
              {estadisticas.maximaFrecuencia - estadisticas.minimaFrecuencia} BPM
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EstadisticasCard;