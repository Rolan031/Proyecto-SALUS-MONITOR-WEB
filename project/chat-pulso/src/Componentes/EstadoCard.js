import React from 'react';

function EstadoCard({ estado, color, consejos }) {
  const fondo = color === 'green' ? '#d4edda' : color === 'orange' ? '#fff3cd' : '#f8d7da';
  const borde = color === 'green' ? '#c3e6cb' : color === 'orange' ? '#ffeaa7' : '#f5c6cb';
  const texto = color === 'green' ? '#155724' : color === 'orange' ? '#856404' : '#721c24';
  const icono = color === 'green' ? '✅' : color === 'orange' ? '⚠️' : '🚨';

  return (
    <div style={{
      marginTop: '10px',
      padding: '8px 12px',
      backgroundColor: fondo,
      borderRadius: '8px',
      border: `1px solid ${borde}`
    }}>
      <div style={{
        fontSize: '14px',
        fontWeight: 'bold',
        color: texto,
        display: 'flex',
        alignItems: 'center',
        gap: '5px'
      }}>
        {icono} Estado: {estado}
      </div>

      {consejos && (
        <div style={{ 
          marginTop: '8px', 
          fontSize: '12px', 
          backgroundColor: 'rgba(255,255,255,0.1)',
          padding: '8px',
          borderRadius: '6px'
        }}>
          <strong style={{ color: '#666' }}>💡 Consejos:</strong>
          <ul style={{ margin: '5px 0', paddingLeft: '15px', color: '#555' }}>
            {consejos.map((c, i) => <li key={i}>{c}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
}

export default EstadoCard;
