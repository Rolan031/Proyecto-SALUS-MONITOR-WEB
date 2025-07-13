import React from 'react';

function EstadoCard({ estado }) {
  const getEstadoConfig = (estado) => {
    const configs = {
      'Crítico': {
        color: '#ef4444',
        bgColor: 'rgba(239, 68, 68, 0.1)',
        borderColor: 'rgba(239, 68, 68, 0.3)',
        icon: '🚨',
        description: 'Requiere atención médica inmediata'
      },
      'Alto': {
        color: '#f97316',
        bgColor: 'rgba(249, 115, 22, 0.1)',
        borderColor: 'rgba(249, 115, 22, 0.3)',
        icon: '⚠️',
        description: 'Necesita monitoreo cercano'
      },
      'Medio': {
        color: '#eab308',
        bgColor: 'rgba(234, 179, 8, 0.1)',
        borderColor: 'rgba(234, 179, 8, 0.3)',
        icon: '📊',
        description: 'Requiere atención moderada'
      },
      'Bajo': {
        color: '#10b981',
        bgColor: 'rgba(16, 185, 129, 0.1)',
        borderColor: 'rgba(16, 185, 129, 0.3)',
        icon: '✅',
        description: 'Estado normal'
      },
      'Normal': {
        color: '#10b981',
        bgColor: 'rgba(16, 185, 129, 0.1)',
        borderColor: 'rgba(16, 185, 129, 0.3)',
        icon: '💚',
        description: 'Frecuencia cardíaca saludable'
      }
    };
    
    return configs[estado] || configs['Normal'];
  };

  const config = getEstadoConfig(estado);

  return (
    <div style={{
      padding: '8px 12px',
      background: config.bgColor,
      borderRadius: '8px',
      border: `1px solid ${config.borderColor}`,
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      marginTop: '8px'
    }}>
      <span style={{ fontSize: '16px' }}>
        {config.icon}
      </span>
      
      <div style={{ flex: '1' }}>
        <div style={{
          fontSize: '12px',
          fontWeight: '600',
          color: config.color,
          marginBottom: '2px'
        }}>
          Estado: {estado}
        </div>
        
        <div style={{
          fontSize: '10px',
          color: '#9ca3af',
          lineHeight: '1.3'
        }}>
          {config.description}
        </div>
      </div>
    </div>
  );
}

export default EstadoCard;