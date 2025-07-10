import React from 'react';

function InputArea({ inputTexto, setInputTexto, presionarEnter, enviarMensaje }) {
  return (
    <div style={{ padding: '20px', borderTop: '1px solid #e9ecef', backgroundColor: 'white' }}>
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <input
          type="text"
          value={inputTexto}
          onChange={(e) => setInputTexto(e.target.value)}
          onKeyPress={presionarEnter}
          placeholder="Escribe tu pulso..."
          style={{
            flex: '1',
            padding: '12px 16px',
            border: '2px solid #e9ecef',
            borderRadius: '25px',
            fontSize: '14px',
            outline: 'none',
            transition: 'all 0.3s ease'
          }}
          onFocus={(e) => e.target.style.borderColor = '#007bff'}
          onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
        />
        <button
          onClick={enviarMensaje}
          style={{
            padding: '12px 20px',
            background: 'linear-gradient(135deg, #007bff, #0056b3)',
            color: 'white',
            border: 'none',
            borderRadius: '25px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 'bold',
            boxShadow: '0 4px 12px rgba(0,123,255,0.3)',
            transition: 'transform 0.2s ease'
          }}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        >
          📤 Enviar
        </button>
      </div>

      <div style={{ textAlign: 'center', marginTop: '10px', fontSize: '12px', color: '#6c757d' }}>
        💬 Ejemplo: "Mi pulso es 80" o solo "80"
      </div>
    </div>
  );
}

export default InputArea;
