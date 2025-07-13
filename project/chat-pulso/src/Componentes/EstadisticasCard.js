import React from 'react';

function EstadisticasCard({ estadisticas, onLimpiar, onExportar }) {
  if (!estadisticas) {
    return null;
  }

  const { promedio, min, max, totalRegistros, estadoMasComun, tendencia } = estadisticas;

  const getTendenciaColor = (tendencia) => {
    switch (tendencia) {
      case 'Elevada':
        return { color: '#ef4444', icon: '📈' };
      case 'Baja':
        return { color: '#3b82f6', icon: '📉' };
      default:
        return { color: '#10b981', icon: '📊' };
    }
  };

  const tendenciaInfo = getTendenciaColor(tendencia);

  return (
    <div style={{
      margin: '16px 0',
      padding: '20px',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      borderRadius: '16px',
      border: '2px solid rgba(102, 126, 234, 0.1)',
      boxShadow: '0 8px 25px rgba(0,0,0,0.08)'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '16px'
      }}>
        <h3 style={{
          margin: '0',
          fontSize: '18px',
          fontWeight: '600',
          color: '#374151',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          📊 Estadísticas de Sesión
        </h3>
        
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={onExportar}
            style={{
              padding: '6px 12px',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '12px',
              cursor: 'pointer',
              fontWeight: '500',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-1px)';
              e.target.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}
          >
            📥 Exportar
          </button>
          
          <button
            onClick={onLimpiar}
            style={{
              padding: '6px 12px',
              background: 'linear-gradient(135deg, #ef4444, #dc2626)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '12px',
              cursor: 'pointer',
              fontWeight: '500',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-1px)';
              e.target.style.boxShadow = '0 4px 12px rgba(239, 68, 68, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}
          >
            🗑️ Limpiar
          </button>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
        gap: '12px',
        marginBottom: '16px'
      }}>
        {/* Promedio */}
        <div style={{
          padding: '12px',
          background: 'white',
          borderRadius: '12px',
          textAlign: 'center',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          border: '1px solid rgba(229, 231, 235, 0.8)'
        }}>
          <div style={{
            fontSize: '24px',
            fontWeight: '700',
            color: '#667eea',
            marginBottom: '4px'
          }}>
            {promedio}
          </div>
          <div style={{
            fontSize: '12px',
            color: '#6b7280',
            fontWeight: '500'
          }}>
            Promedio BPM
          </div>
        </div>

        {/* Mínimo */}
        <div style={{
          padding: '12px',
          background: 'white',
          borderRadius: '12px',
          textAlign: 'center',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          border: '1px solid rgba(229, 231, 235, 0.8)'
        }}>
          <div style={{
            fontSize: '24px',
            fontWeight: '700',
            color: '#3b82f6',
            marginBottom: '4px'
          }}>
            {min}
          </div>
          <div style={{
            fontSize: '12px',
            color: '#6b7280',
            fontWeight: '500'
          }}>
            Mínimo BPM
          </div>
        </div>

        {/* Máximo */}
        <div style={{
          padding: '12px',
          background: 'white',
          borderRadius: '12px',
          textAlign: 'center',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          border: '1px solid rgba(229, 231, 235, 0.8)'
        }}>
          <div style={{
            fontSize: '24px',
            fontWeight: '700',
            color: '#ef4444',
            marginBottom: '4px'
          }}>
            {max}
          </div>
          <div style={{
            fontSize: '12px',
            color: '#6b7280',
            fontWeight: '500'
          }}>
            Máximo BPM
          </div>
        </div>

        {/* Total Registros */}
        <div style={{
          padding: '12px',
          background: 'white',
          borderRadius: '12px',
          textAlign: 'center',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          border: '1px solid rgba(229, 231, 235, 0.8)'
        }}>
          <div style={{
            fontSize: '24px',
            fontWeight: '700',
            color: '#10b981',
            marginBottom: '4px'
          }}>
            {totalRegistros}
          </div>
          <div style={{
            fontSize: '12px',
            color: '#6b7280',
            fontWeight: '500'
          }}>
            Registros
          </div>
        </div>
      </div>

      {/* Información adicional */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 16px',
        background: 'rgba(255,255,255,0.8)',
        borderRadius: '12px',
        border: '1px solid rgba(229, 231, 235, 0.8)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <span style={{ fontSize: '16px' }}>🎯</span>
          <div>
            <div style={{
              fontSize: '14px',
              fontWeight: '600',
              color: '#374151'
            }}>
              Estado más común
            </div>
            <div style={{
              fontSize: '12px',
              color: '#6b7280'
            }}>
              {estadoMasComun}
            </div>
          </div>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <span style={{ fontSize: '16px' }}>{tendenciaInfo.icon}</span>
          <div>
            <div style={{
              fontSize: '14px',
              fontWeight: '600',
              color: '#374151'
            }}>
              Tendencia
            </div>
            <div style={{
              fontSize: '12px',
              color: tendenciaInfo.color,
              fontWeight: '500'
            }}>
              {tendencia}
            </div>
          </div>
        </div>
      </div>

      {/* Nota informativa */}
      <div style={{
        marginTop: '12px',
        padding: '8px 12px',
        background: 'rgba(102, 126, 234, 0.1)',
        borderRadius: '8px',
        border: '1px solid rgba(102, 126, 234, 0.2)',
        fontSize: '12px',
        color: '#374151',
        textAlign: 'center'
      }}>
        💡 Estas estadísticas se basan en los registros de esta sesión
      </div>
    </div>
  );
}

export default EstadisticasCard; 