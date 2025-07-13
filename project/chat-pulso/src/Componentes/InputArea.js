import React from 'react';

function InputArea({ inputTexto, setInputTexto, presionarEnter, enviarMensaje, isTyping, sugerencias = [] }) {
  return (
    <div style={{ 
      padding: '20px', 
      borderTop: '1px solid rgba(229, 231, 235, 0.8)', 
      backgroundColor: 'white',
      position: 'relative'
    }}>
      {/* Efecto de sombra superior */}
      <div style={{
        position: 'absolute',
        top: '0',
        left: '0',
        right: '0',
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(102, 126, 234, 0.2), transparent)'
      }} />
      
      <div style={{ 
        display: 'flex', 
        gap: '12px', 
        alignItems: 'center',
        position: 'relative'
      }}>
        <div style={{
          flex: '1',
          position: 'relative',
          display: 'flex',
          alignItems: 'center'
        }}>
          <input
            type="text"
            value={inputTexto}
            onChange={(e) => setInputTexto(e.target.value)}
            onKeyPress={presionarEnter}
            placeholder="Escribe tu frecuencia cardíaca..."
            disabled={isTyping}
            style={{
              width: '100%',
              padding: '16px 20px',
              border: '2px solid #e5e7eb',
              borderRadius: '25px',
              fontSize: '15px',
              outline: 'none',
              transition: 'all 0.3s ease',
              backgroundColor: isTyping ? '#f9fafb' : 'white',
              color: isTyping ? '#9ca3af' : '#374151',
              fontFamily: '"Inter", sans-serif',
              fontWeight: '400'
            }}
            onFocus={(e) => {
              if (!isTyping) {
                e.target.style.borderColor = '#667eea';
                e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
              }
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#e5e7eb';
              e.target.style.boxShadow = 'none';
            }}
          />
          
          {/* Icono de pulso */}
          <div style={{
            position: 'absolute',
            right: '16px',
            fontSize: '18px',
            color: isTyping ? '#9ca3af' : '#667eea',
            animation: isTyping ? 'none' : 'pulse 2s infinite'
          }}>
            💓
          </div>
        </div>
        
        <button
          onClick={enviarMensaje}
          disabled={isTyping || inputTexto.trim() === ''}
          style={{
            padding: '16px 24px',
            background: isTyping || inputTexto.trim() === '' 
              ? 'linear-gradient(135deg, #9ca3af, #6b7280)'
              : 'linear-gradient(135deg, #667eea, #764ba2)',
            color: 'white',
            border: 'none',
            borderRadius: '25px',
            cursor: isTyping || inputTexto.trim() === '' ? 'not-allowed' : 'pointer',
            fontSize: '15px',
            fontWeight: '600',
            boxShadow: isTyping || inputTexto.trim() === ''
              ? '0 4px 12px rgba(156, 163, 175, 0.3)'
              : '0 8px 25px rgba(102, 126, 234, 0.3)',
            transition: 'all 0.3s ease',
            fontFamily: '"Inter", sans-serif',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            minWidth: '120px',
            justifyContent: 'center'
          }}
          onMouseEnter={(e) => {
            if (!isTyping && inputTexto.trim() !== '') {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 12px 35px rgba(102, 126, 234, 0.4)';
            }
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = isTyping || inputTexto.trim() === ''
              ? '0 4px 12px rgba(156, 163, 175, 0.3)'
              : '0 8px 25px rgba(102, 126, 234, 0.3)';
          }}
        >
          {isTyping ? (
            <>
              <div style={{ fontSize: '14px' }}>⏳</div>
              Esperando...
            </>
          ) : (
            <>
              <div style={{ fontSize: '16px' }}>📤</div>
              Enviar
            </>
          )}
        </button>
      </div>

      {/* Sugerencias contextuales */}
      {sugerencias.length > 0 && inputTexto.trim() !== '' && (
        <div style={{
          marginTop: '12px',
          padding: '12px',
          background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
          borderRadius: '12px',
          border: '1px solid rgba(59, 130, 246, 0.2)'
        }}>
          <div style={{
            fontSize: '13px',
            fontWeight: '600',
            color: '#1e40af',
            marginBottom: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            💡 Sugerencias:
          </div>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '4px'
          }}>
            {sugerencias.map((sugerencia, index) => (
              <div key={index} style={{
                fontSize: '12px',
                color: '#374151',
                padding: '4px 8px',
                background: 'rgba(255,255,255,0.6)',
                borderRadius: '6px',
                border: '1px solid rgba(255,255,255,0.8)'
              }}>
                {sugerencia}
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ 
        textAlign: 'center', 
        marginTop: '12px', 
        fontSize: '13px', 
        color: '#6b7280',
        fontFamily: '"Inter", sans-serif',
        fontWeight: '400'
      }}>
        {isTyping ? (
          <span style={{ color: '#667eea' }}>🔄 Analizando tu frecuencia cardíaca...</span>
        ) : (
          <>
            💡 <strong>Ejemplos:</strong> "75", "Mi pulso es 80", "Bebé con 120 BPM"
          </>
        )}
      </div>
    </div>
  );
}

export default InputArea;
