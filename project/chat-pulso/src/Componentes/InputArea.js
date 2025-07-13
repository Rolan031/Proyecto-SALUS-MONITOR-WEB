import React, { useState, useEffect } from 'react';

function InputArea({ inputTexto, setInputTexto, presionarEnter, enviarMensaje, isTyping, sugerencias }) {
  const [mostrarSugerencias, setMostrarSugerencias] = useState(false);

  useEffect(() => {
    setMostrarSugerencias(sugerencias.length > 0 && inputTexto.length > 0);
  }, [sugerencias, inputTexto]);

  return (
    <div style={{
      padding: '20px',
      background: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)',
      borderTop: '1px solid rgba(16, 185, 129, 0.2)',
      position: 'relative'
    }}>
      {/* Sugerencias */}
      {mostrarSugerencias && (
        <div style={{
          position: 'absolute',
          bottom: '100%',
          left: '20px',
          right: '20px',
          background: 'rgba(15, 23, 42, 0.95)',
          borderRadius: '12px',
          padding: '12px',
          marginBottom: '8px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          backdropFilter: 'blur(10px)',
          zIndex: 10
        }}>
          <div style={{
            fontSize: '12px',
            color: '#10b981',
            fontWeight: '600',
            marginBottom: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            💡 Sugerencias:
          </div>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '6px'
          }}>
            {sugerencias.map((sugerencia, index) => (
              <div
                key={index}
                style={{
                  padding: '4px 8px',
                  background: 'rgba(16, 185, 129, 0.1)',
                  borderRadius: '6px',
                  fontSize: '11px',
                  color: '#10b981',
                  border: '1px solid rgba(16, 185, 129, 0.2)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(16, 185, 129, 0.2)';
                  e.target.style.borderColor = 'rgba(16, 185, 129, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(16, 185, 129, 0.1)';
                  e.target.style.borderColor = 'rgba(16, 185, 129, 0.2)';
                }}
                onClick={() => {
                  setInputTexto(sugerencia);
                  setMostrarSugerencias(false);
                }}
              >
                {sugerencia}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Área de entrada */}
      <div style={{
        display: 'flex',
        gap: '12px',
        alignItems: 'flex-end'
      }}>
        <div style={{
          flex: '1',
          position: 'relative'
        }}>
          <textarea
            value={inputTexto}
            onChange={(e) => setInputTexto(e.target.value)}
            onKeyDown={presionarEnter}
            placeholder="Escribe tu frecuencia cardíaca o pregunta..."
            disabled={isTyping}
            style={{
              width: '100%',
              minHeight: '44px',
              maxHeight: '120px',
              padding: '12px 16px',
              background: 'rgba(31, 41, 55, 0.8)',
              border: '1px solid rgba(75, 85, 99, 0.5)',
              borderRadius: '12px',
              color: '#f3f4f6',
              fontSize: '14px',
              fontFamily: '"Poppins", sans-serif',
              resize: 'none',
              outline: 'none',
              transition: 'all 0.2s ease',
              cursor: isTyping ? 'not-allowed' : 'text'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = 'rgba(16, 185, 129, 0.5)';
              e.target.style.boxShadow = '0 0 0 3px rgba(16, 185, 129, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'rgba(75, 85, 99, 0.5)';
              e.target.style.boxShadow = 'none';
            }}
          />
          
          {/* Indicador de caracteres */}
          <div style={{
            position: 'absolute',
            bottom: '8px',
            right: '12px',
            fontSize: '10px',
            color: inputTexto.length > 200 ? '#ef4444' : '#6b7280',
            pointerEvents: 'none'
          }}>
            {inputTexto.length}/200
          </div>
        </div>

        {/* Botón de envío */}
        <button
          onClick={enviarMensaje}
          disabled={inputTexto.trim() === '' || isTyping}
          style={{
            width: '44px',
            height: '44px',
            background: inputTexto.trim() === '' || isTyping
              ? 'rgba(75, 85, 99, 0.3)'
              : 'linear-gradient(135deg, #059669 0%, #0891b2 100%)',
            border: 'none',
            borderRadius: '12px',
            color: 'white',
            cursor: inputTexto.trim() === '' || isTyping ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '16px',
            transition: 'all 0.2s ease',
            boxShadow: inputTexto.trim() === '' || isTyping
              ? 'none'
              : '0 4px 12px rgba(5, 150, 105, 0.3)'
          }}
          onMouseEnter={(e) => {
            if (inputTexto.trim() !== '' && !isTyping) {
              e.target.style.transform = 'scale(1.05)';
              e.target.style.boxShadow = '0 6px 16px rgba(5, 150, 105, 0.4)';
            }
          }}
          onMouseLeave={(e) => {
            if (inputTexto.trim() !== '' && !isTyping) {
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = '0 4px 12px rgba(5, 150, 105, 0.3)';
            }
          }}
        >
          {isTyping ? (
            <div style={{
              width: '16px',
              height: '16px',
              border: '2px solid rgba(255,255,255,0.3)',
              borderTop: '2px solid white',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }} />
          ) : (
            <span style={{ fontSize: '18px' }}>➤</span>
          )}
        </button>
      </div>

      {/* Indicadores de estado */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '8px',
        fontSize: '11px',
        color: '#6b7280'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}>
          {isTyping && (
            <>
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#10b981',
                animation: 'pulse 1s infinite'
              }} />
              <span>Analizando...</span>
            </>
          )}
        </div>
        
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <span>💡 Presiona Enter para enviar</span>
          {inputTexto.length > 0 && (
            <span style={{
              color: inputTexto.length > 200 ? '#ef4444' : '#10b981'
            }}>
              {inputTexto.length} caracteres
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default InputArea;