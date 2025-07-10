import React, { useState } from 'react';
import ChatMessage from './Componentes/ChatMessage';
import InputArea from './Componentes/InputArea';
import { analizarPulso } from './utils/analizarpulso';

function App() {
  const [mensajes, setMensajes] = useState([
    { id: 1, texto: 'Hola! Escribe tu pulso y te diré como estás', usuario: false }
  ]);
  const [inputTexto, setInputTexto] = useState('');

  const enviarMensaje = () => {
    if (inputTexto === '') return;

    const nuevoMensajeUsuario = {
      id: Date.now(),
      texto: inputTexto,
      usuario: true
    };

    const numeros = inputTexto.match(/\d+/);
    let respuestaBot;

    if (numeros) {
      const analisis = analizarPulso(numeros[0]);
      respuestaBot = {
        id: Date.now() + 1,
        texto: analisis.mensaje,
        usuario: false,
        ...analisis
      };
    } else {
      respuestaBot = {
        id: Date.now() + 1,
        texto: 'No entiendo. Escribe solo números como: 75',
        usuario: false
      };
    }

    setMensajes([...mensajes, nuevoMensajeUsuario, respuestaBot]);
    setInputTexto('');
  };

  const presionarEnter = (e) => {
    if (e.key === 'Enter') enviarMensaje();
  };

  return (
    <div style={{
      maxWidth: '400px',
      margin: '20px auto',
      borderRadius: '15px',
      boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
      fontFamily: '"Roboto", "Open Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      overflow: 'hidden',
      background: '#1a1a1a'
    }}>
      <div style={{
        background: 'linear-gradient(135deg, #00D4AA 0%, #00B894 100%)',
        color: 'white',
        padding: '20px',
        textAlign: 'center',
        borderBottom: '1px solid rgba(255,255,255,0.1)'
      }}>
        <h2 style={{
          margin: '0',
          fontSize: '24px',
          fontWeight: '600',
          letterSpacing: '0.5px'
        }}>
          💓 Chat de Pulso
        </h2>
        <p style={{
          margin: '5px 0 0 0',
          fontSize: '14px',
          opacity: '0.9',
          fontWeight: '400'
        }}>
          Tu asistente de salud cardíaca
        </p>
      </div>

      <div style={{
        height: '350px',
        overflowY: 'scroll',
        padding: '15px',
        background: '#2d3748',
        scrollBehavior: 'smooth'
      }}>
        {mensajes.map((m) => <ChatMessage key={m.id} mensaje={m} />)}
      </div>

      <InputArea
        inputTexto={inputTexto}
        setInputTexto={setInputTexto}
        presionarEnter={presionarEnter}
        enviarMensaje={enviarMensaje}
      />
    </div>
  );
}

export default App;