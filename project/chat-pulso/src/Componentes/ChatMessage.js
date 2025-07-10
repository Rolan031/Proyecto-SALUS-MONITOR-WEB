import React from 'react';
import EstadoCard from './EstadoCard';

function ChatMessage({ mensaje }) {
  return (
    <div style={{ marginBottom: '15px' }}>
      <div style={{
        padding: '12px 16px',
        borderRadius: '18px',
        maxWidth: '85%',
        backgroundColor: mensaje.usuario ? '#007bff' : 'white',
        color: mensaje.usuario ? 'white' : '#333',
        marginLeft: mensaje.usuario ? 'auto' : '0',
        marginRight: mensaje.usuario ? '0' : 'auto',
        boxShadow: mensaje.usuario 
          ? '0 4px 12px rgba(0,123,255,0.3)' 
          : '0 4px 12px rgba(0,0,0,0.1)',
        border: mensaje.usuario ? 'none' : '1px solid #e9ecef'
      }}>
        {mensaje.texto}

        {mensaje.estado && (
          <EstadoCard estado={mensaje.estado} color={mensaje.color} consejos={mensaje.consejos} />
        )}
      </div>
    </div>
  );
}

export default ChatMessage;
