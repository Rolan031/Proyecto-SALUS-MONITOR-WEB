import React from 'react';
import EstadoCard from './EstadoCard';

function ChatMessage({ mensaje }) {
  // Validación para evitar errores cuando mensaje es undefined o null
  if (!mensaje) {
    return null; // No renderizar nada si no hay mensaje
  }

  const isUsuario = mensaje.usuario;
  
  return (
    <div style={{
      display: 'flex',
      justifyContent: isUsuario ? 'flex-end' : 'flex-start',
      marginBottom: '16px',
      animation: 'fadeIn 0.3s ease-in'
    }}>
      <div style={{
        maxWidth: '85%',
        padding: '12px 16px',
        borderRadius: isUsuario ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
        background: isUsuario 
          ? 'linear-gradient(135deg, #059669 0%, #0891b2 100%)'
          : 'rgba(31, 41, 55, 0.8)',
        color: 'white',
        boxShadow: isUsuario 
          ? '0 4px 12px rgba(5, 150, 105, 0.3)'
          : '0 4px 12px rgba(0,0,0,0.2)',
        border: isUsuario 
          ? '1px solid rgba(16, 185, 129, 0.3)'
          : '1px solid rgba(75, 85, 99, 0.3)',
        position: 'relative',
        wordWrap: 'break-word',
        lineHeight: '1.5'
      }}>
        {/* Timestamp */}
        <div style={{
          fontSize: '10px',
          opacity: '0.7',
          marginBottom: '4px',
          color: isUsuario ? 'rgba(255,255,255,0.8)' : '#9ca3af'
        }}>
          {mensaje.timestamp ? new Date(mensaje.timestamp).toLocaleTimeString('es-ES', {
            hour: '2-digit',
            minute: '2-digit'
          }) : ''}
        </div>

        {/* Contenido del mensaje */}
        <div style={{
          fontSize: '14px',
          whiteSpace: 'pre-wrap',
          color: isUsuario ? 'white' : '#f3f4f6'
        }}>
          {mensaje.texto}
        </div>

        {/* Estado de salud si existe */}
        {mensaje.estado && (
          <div style={{ marginTop: '8px' }}>
            <EstadoCard estado={mensaje.estado} />
          </div>
        )}

        {/* Información adicional del backend */}
        {mensaje.source === 'backend' && (
          <div style={{
            marginTop: '8px',
            padding: '6px 8px',
            background: 'rgba(16, 185, 129, 0.1)',
            borderRadius: '6px',
            border: '1px solid rgba(16, 185, 129, 0.2)',
            fontSize: '11px',
            color: '#10b981'
          }}>
            📊 Datos del sistema Salus Monitor
          </div>
        )}

        {/* Indicador de error */}
        {mensaje.error && (
          <div style={{
            marginTop: '8px',
            padding: '6px 8px',
            background: 'rgba(239, 68, 68, 0.1)',
            borderRadius: '6px',
            border: '1px solid rgba(239, 68, 68, 0.2)',
            fontSize: '11px',
            color: '#fca5a5'
          }}>
            ❌ Error en el análisis
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatMessage;