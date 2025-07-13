import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useVitalData from '../pages/vitalmonitor/hooks/useVitalData';
import VitalSignCard from '../common/VitalSignCard';
import ControlPanel from '../pages/vitalmonitor/ControlPanel';
import SessionInfo from '../pages/vitalmonitor/SessionInfo';
import RealTimeChart from '../pages/vitalmonitor/RealTimeChart';

// Copia de analizarPulso
function analizarPulso(pulso) {
  const numero = parseInt(pulso);
  if (numero < 60) {
    return {
      estado: 'MALO',
      color: 'red',
      mensaje: 'Tu pulso está muy bajo. Deberías ir al doctor.',
      consejos: ['Ve al doctor', 'No hagas ejercicio', 'Descansa']
    };
  } else if (numero <= 100) {
    return {
      estado: 'BIEN',
      color: 'green',
      mensaje: 'Tu pulso está normal. Estás bien!',
      consejos: ['Sigue así', 'Haz ejercicio', 'Come saludable']
    };
  } else if (numero <= 150) {
    return {
      estado: 'REGULAR',
      color: 'orange',
      mensaje: 'Tu pulso está un poco alto. Ten cuidado.',
      consejos: ['Relájate', 'Respira profundo', 'Toma agua']
    };
  } else {
    return {
      estado: 'MALO',
      color: 'red',
      mensaje: 'Tu pulso está muy alto! Ve al doctor YA!',
      consejos: ['Llama al doctor', 'Siéntate', 'No te muevas mucho']
    };
  }
}

// Componente EstadoCard
function EstadoCard({ estado, color, consejos }) {
  // Paleta de colores moderna
  const palette = {
    green: { bg: '#e6fff3', text: '#0a4d2c', icon: '✅' },
    orange: { bg: '#fff7e6', text: '#a86a00', icon: '⚠️' },
    red: { bg: '#ffeaea', text: '#a8002a', icon: '🚨' }
  };
  const pal = palette[color] || palette.green;

  return (
    <div
      style={{
        marginTop: '10px',
        padding: '12px 10px',
        background: pal.bg,
        borderRadius: '16px',
        // border: `2px solid ${pal.border}`,
        boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
        width: '100%',
        boxSizing: 'border-box',
        marginBottom: '8px',
        transition: 'box-shadow 0.2s'
      }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        fontWeight: 'bold',
        fontSize: '13px',
        color: pal.text,
        marginBottom: '8px',
        gap: '8px'
      }}>
        <span style={{ fontSize: '1.7em' }}>{pal.icon}</span>
        Estado: <span style={{ textTransform: 'uppercase', letterSpacing: '1px' }}>{estado}</span>
      </div>
      {consejos && (
        <div style={{
          background: 'rgba(255,255,255,0.7)',
          borderRadius: '10px',
          padding: '8px 10px',
          marginTop: '6px',
          width: '100%',
          boxSizing: 'border-box'
        }}>
          <strong style={{ color: pal.text, fontSize: '15px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            💡 Consejos:
          </strong>
          <ul style={{ margin: '7px 0 0 0', paddingLeft: '18px', color: '#444', fontSize: '14px' }}>
            {consejos.map((c, i) => <li key={i}>{c}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
}

// Componente ChatMessage
function ChatMessage({ mensaje }) {
  // Ruta de la imagen del bot (usa la del mensaje o una por defecto)
  const botImg = mensaje.imgBotUrl || './SalusIMG/2-. Design@3x no back.png';

  // Si es el mensaje de bienvenida, mostrar imagen grande y texto alineados
  if (mensaje.esBienvenida) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
        <div style={{ minWidth: '70px', display: 'flex', justifyContent: 'center' }}>
          <img
            src={botImg}
            alt="Chatbot"
            style={{
              width: '110px',
              height: '95px',
              borderRadius: '18px',
              marginRight: '10px',
              border: 'none',
              background: 'none',
              objectFit: 'cover'
            }}
          />
        </div>
        <div style={{
          padding: '16px 20px',
          borderRadius: '18px 18px 18px 6px',
          backgroundColor: '#23283a',
          color: '#fff',
          fontSize: '13px',
          boxShadow: '0 4px 12px #10151f33',
          border: '1px solid #1aff8b22',
          position: 'relative',
          maxWidth: '70%'
        }}>
          {mensaje.texto}
          <span style={{
            position: 'absolute',
            left: '-12px',
            top: '28px',
            width: 0,
            height: 0,
            borderTop: '12px solid transparent',
            borderBottom: '12px solid transparent',
            borderRight: '12px solid #23283a'
          }} />
        </div>
      </div>
    );
  }

  // Si es un mensaje del bot (no del usuario), mostrar imagen pequeña a la izquierda
  if (!mensaje.usuario) {
    return (
      <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '15px' }}>
        <div style={{ minWidth: '85px', display: 'flex', justifyContent: 'center' }}>
          <img
            src={botImg}
            alt="Chatbot"
            style={{
              width: '85px',
              height: '99px',
              borderRadius: '100%',
              marginRight: '10px',
              border: 'none',
              background: 'none',
              objectFit: 'cover'
            }}
          />
        </div>
        <div style={{
          padding: '12px 16px',
          borderRadius: '18px 18px 18px 6px',
          maxWidth: '85%',
          backgroundColor: '#23283a',
          color: '#fff',
          boxShadow: '0 4px 12px #10151f33',
          border: '1px solid #1aff8b22',
          fontSize: '13px',
          position: 'relative'
        }}>
          {mensaje.texto}
          <span style={{
            position: 'absolute',
            left: '-12px',
            top: '18px',
            width: 0,
            height: 0,
            borderTop: '8px solid transparent',
            borderBottom: '8px solid transparent',
            borderRight: '12px solid #23283a'
          }} />
          {mensaje.estado && (
            <EstadoCard estado={mensaje.estado} color={mensaje.color} consejos={mensaje.consejos} />
          )}
        </div>
      </div>
    );
  }

  // Mensaje del usuario (sin imagen)
  return (
    <div style={{ marginBottom: '15px' }}>
      <div style={{
        padding: '12px 16px',
        borderRadius: '18px',
        maxWidth: '85%',
        backgroundColor: '#1aff8b',
        color: '#10151f',
        marginLeft: 'auto',
        marginRight: '0',
        boxShadow: '0 4px 12px #1aff8b55',
        border: 'none',
        fontSize: '15px'
      }}>
        {mensaje.texto}
      </div>
    </div>
  );
}

// Componente InputArea
function InputArea({ inputTexto, setInputTexto, presionarEnter, enviarMensaje }) {
  return (
    <div style={{ padding: '18px', borderTop: '1px solid #1aff8b22', backgroundColor: '#23283a' }}>
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <input
          type="text"
          value={inputTexto}
          onChange={(e) => setInputTexto(e.target.value)}
          onKeyPress={presionarEnter}
          placeholder="Escribe tu pulso..."
          style={{
            flex: '1',
            padding: '10px 12px',
            border: '2px solid #1aff8b33',
            borderRadius: '18px',
            fontSize: '14px',
            outline: 'none',
            background: '#181e2a',
            color: '#fff',
            transition: 'all 0.3s ease'
          }}
        />
        <button
          onClick={enviarMensaje}
          style={{
            padding: '10px 20px',
            background: 'linear-gradient(90deg, #1aff8b 0%, #13c77b 100%)',
            color: '#10151f',
            border: 'none',
            borderRadius: '18px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold',
            boxShadow: '0 4px 16px #1aff8b55',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.25s cubic-bezier(.4,1.4,.6,1)'
          }}
          onMouseOver={e => {
            e.currentTarget.style.transform = 'scale(1.08)';
            e.currentTarget.style.background = 'linear-gradient(90deg, #13c77b 0%, #1aff8b 100%)';
            e.currentTarget.style.boxShadow = '0 6px 24px #1aff8b99';
          }}
          onMouseOut={e => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.background = 'linear-gradient(90deg, #1aff8b 0%, #13c77b 100%)';
            e.currentTarget.style.boxShadow = '0 4px 16px #1aff8b55';
          }}
        >
          <span style={{fontSize:'1.7em'}}>📤</span>
        </button>
      </div>
      <div style={{ textAlign: 'center', marginTop: '10px', fontSize: '12px', color: '#b6eada' }}>
        💬 Ejemplo: "Mi pulso es 80" o solo "80"
      </div>
    </div>
  );
}

const DEVICE_IDS = [
  'ESP32_001',
  'ESP32_002',
  'PRUEBA_123',
  // Agrega aquí los deviceId existentes que quieras mostrar
];

const VitalMonitor = ({ patient }) => {
  const {
    vitals,
    currentSession,
    isMonitoring,
    isWsConnected,
    error,
    startMonitoring,
    stopMonitoring,
  } = useVitalData(patient.id);

  const [notification, setNotification] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedDeviceId, setSelectedDeviceId] = useState(DEVICE_IDS[0]);

  // Filtrar los vitals por el deviceId seleccionado
  const filteredVitals = vitals.filter(v => v.deviceId === selectedDeviceId);
  const latestVital = filteredVitals.length > 0 ? filteredVitals[filteredVitals.length - 1] : null;

  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  const handleToggleMonitoring = async () => {
    try {
      if (isMonitoring) {
        await stopMonitoring();
        showNotification('Monitoreo detenido correctamente', 'info');
      } else {
        await startMonitoring();
        showNotification('Monitoreo iniciado correctamente', 'success');
      }
    } catch (error) {
      showNotification('Error al cambiar estado de monitoreo', 'error');
    }
  };

  const getVitalStatus = (value, type) => {
    if (!value) return 'normal';
    const ranges = {
      heartRate: { min: 60, max: 100 }
    };

    const range = ranges[type];
    if (!range) return 'normal';
    if (value < range.min) return 'low';
    if (value > range.max) return 'high';
    return 'normal';
  };

  const getFilteredVitals = () => {
    if (!vitals.length) return [];
    // Mostrar todos los datos disponibles sin filtro de tiempo
    return vitals;
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-between items-center relative overflow-y-auto custom-scrollbar">
      {/* Partículas decorativas */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <svg width="100%" height="100%" className="absolute inset-0" style={{ opacity: 0.18 }}>
          {[...Array(80)].map((_, i) => (
            <circle key={i} cx={Math.random()*100+'%'} cy={Math.random()*100+'%'} r={Math.random()*2+1} fill="#1aff8b" />
          ))}
        </svg>
      </div>

      {/* Header paciente */}
      <div className="w-full max-w-5xl flex flex-row items-center justify-between bg-[#23283a]/80 backdrop-blur-xl rounded-2xl shadow-2xl px-10 py-2 mt-1 mb-1 border border-[#1aff8b]/20 z-10" style={{boxShadow:'0 8px 40px #1aff8b22'}}>
        <div className="flex flex-row items-center gap-6">
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center bg-[#1aff8b]/20">
            <span className="text-5xl text-[#1aff8b]"><i className="fas fa-user"></i></span>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-white leading-tight">{patient.nombre}</span>
            <div className="flex flex-row gap-6 text-[#b6eada] text-lg mt-1">
              <span><i className="fas fa-birthday-cake mr-1" />{patient.edad} años</span>
              <span><i className="fas fa-venus-mars mr-1" />{patient.genero}</span>
              <span><i className="fas fa-calendar-alt mr-1" />{new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center gap-3">
          <span className={`w-4 h-4 rounded-full ${isMonitoring ? 'bg-[#1aff8b] animate-pulse' : 'bg-gray-400' }`}></span>
          <span className={`font-semibold text-xl ${isMonitoring ? 'text-[#1aff8b]' : 'text-gray-400'}`}>{isMonitoring ? 'Monitoreando' : 'Detenido'}</span>
        </div>
      </div>

      {/* Selector de dispositivo */}
      <div className="w-full max-w-5xl flex flex-row items-center justify-center mt-4 mb-2">
        <label className="text-white mr-3 font-semibold">Dispositivo:</label>
        <select
          value={selectedDeviceId}
          onChange={e => setSelectedDeviceId(e.target.value)}
          className="px-4 py-2 rounded-lg bg-[#23283a] text-[#1aff8b] border border-[#1aff8b]/40 focus:outline-none"
        >
          {DEVICE_IDS.map(id => (
            <option key={id} value={id}>{id}</option>
          ))}
        </select>
      </div>

      {/* Main cards layout - Sin gap */}
      <div className="w-full max-w-5xl flex flex-row justify-center items-stretch z-10 mb-1">
        {/* Card BPM */}
        <div className="flex-1 flex flex-col items-center justify-center bg-[#23283a]/80 backdrop-blur-xl rounded-l-2xl shadow-2xl border border-[#1aff8b]/20 border-r-0 px-2 py-6 min-w-[320px] max-w-[420px]" style={{boxShadow:'0 8px 40px #1aff8b22'}}>
          <div className="text-8xl mb-2 animate-pulse">
            <span role="img" aria-label="corazon" className="" style={{filter:'drop-shadow(0 2px 8px #1aff8b88)'}}>❤️</span>
          </div>
          <div className="text-7xl font-extrabold text-[#1aff8b] mb-1 tracking-wider">
            {latestVital ? latestVital.heartRate : '--'}
          </div>
          <div className="text-[#b6eada] text-2xl tracking-widest">BPM</div>
        </div>
        {/* Card sesión */}
        <div className="flex flex-col items-center justify-center bg-[#23283a]/80 backdrop-blur-xl rounded-r-2xl shadow-2xl border border-[#1aff8b]/20 px-10 py-6 min-w-[260px] max-w-[320px]" style={{boxShadow:'0 8px 40px #1aff8b22'}}>
          <div className="flex flex-col items-center gap-4 w-full">
            {/* Tiempo de sesión */}
            <div className="flex flex-col items-center">
              <div className="text-[#1aff8b] text-3xl font-bold mb-1">
                {currentSession && currentSession.startTime ? (
                  (() => {
                    const start = new Date(currentSession.startTime);
                    const end = currentSession.endTime ? new Date(currentSession.endTime) : new Date();
                    const duration = Math.floor((end - start) / 1000);
                    const h = String(Math.floor(duration / 3600)).padStart(2, '0');
                    const m = String(Math.floor((duration % 3600) / 60)).padStart(2, '0');
                    const s = String(duration % 60).padStart(2, '0');
                    return `${h}:${m}:${s}`;
                  })()
                ) : '00:00:00'}
              </div>
              <div className="text-[#b6eada] text-lg">TIEMPO DE SESIÓN</div>
            </div>
            {/* Estado de conexión */}
            <div className="flex flex-col items-center">
              <div className={`text-2xl font-bold mb-1 ${isWsConnected ? 'text-[#1aff8b]' : 'text-[#ff4b7b]'}`}>{isWsConnected ? 'Conectado' : 'Desconectado'}</div>
              <div className="text-[#b6eada] text-lg">ESTADO ESP32</div>
            </div>
            {/* Datos recopilados */}
            <div className="flex flex-col items-center">
              <div className="text-[#1aff8b] text-2xl font-bold mb-1">{filteredVitals.length}</div>
              <div className="text-[#b6eada] text-lg">DATOS RECOPILADOS</div>
            </div>
          </div>
        </div>
      </div>

      {/* Barra inferior de controles ultra compacta */}
      <div className="w-full max-w-5xl flex flex-row items-center justify-center z-20 mt-1 mb-1">
        <div className="flex flex-row items-center justify-center w-full bg-[#23283a]/80 backdrop-blur-xl border border-[#1aff8b]/20 rounded-2xl shadow-2xl px-3 py-1" style={{minHeight: '40px', boxShadow:'0 8px 40px #1aff8b22'}}>
          <div className="flex flex-row gap-2 items-center w-full justify-center">
            <ControlPanel
              isMonitoring={isMonitoring}
              onToggleMonitoring={handleToggleMonitoring}
              patient={patient}
              vitals={vitals}
            />
          </div>
        </div>
      </div>

      {/* Botón flotante de chat bot */}
      {!isChatOpen && (
        <button
          className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-[#1aff8b] shadow-2xl flex items-center justify-center hover:bg-[#13c77b] transition-all duration-200 border-4 border-[#23283a]"
          style={{boxShadow:'0 4px 32px #1aff8b55'}}
          title="Abrir chat bot"
          onClick={() => {
            setIsChatOpen(true);
            // Prevenir scroll al abrir el chat
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <img
            src="/src/assets/1._Design3x redimensionado sinfondo.png"
            alt="Abrir chat bot"
            className="transition-transform duration-300 ease-in-out hover:scale-110 hover:shadow-2xl"
            style={{ width: '44px', height: '44px', borderRadius: '50%', border: '2px solid #10151f', background: 'none', objectFit: 'cover' }}
          />
        </button>
      )}

      {/* Modal flotante de chat bot */}
      {isChatOpen && (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end" style={{overflow: 'visible'}}>
          <div
            className="relative w-[320px] max-w-[90vw] max-h-[80vh] bg-[#23283a]/90 backdrop-blur-2xl border border-[#1aff8b]/40 shadow-xl rounded-2xl flex flex-col-reverse animate-fadeIn overflow-y-auto"
            style={{boxShadow:'0 6px 32px #1aff8b33'}}
          >
            {/* Header del chat */}
            <div className="flex items-center justify-between px-3 py-2 border-b border-[#1aff8b]/10 bg-[#23283a]/95 rounded-t-2xl">
              <div className="flex items-center gap-2">
                {/* Imagen pequeña del bot en el header */}
                <img
                  src="/src/assets/1._Design3x redimensionado sinfondo.png"
                  alt="Chatbot"
                  style={{ width: '28px', height: '28px', borderRadius: '50%', border: '2px solid #1aff8b', background: 'none' }}
                />
                <span className="font-bold text-base text-white">Chat Bot</span>
              </div>
              <button onClick={() => setIsChatOpen(false)} className="text-[#1aff8b] hover:text-[#7f5fff] text-lg font-bold px-2 py-1 rounded transition-all" title="Cerrar">
                ×
              </button>
            </div>
            {/* Cuerpo del chat funcional */}
            <ChatBotPanel patient={patient} />
          </div>
          <style>{`
            .animate-fadeIn {
              animation: fadeIn 0.3s cubic-bezier(.4,1.4,.6,1) both;
            }
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(40px) scale(0.95); }
              to { opacity: 1; transform: translateY(0) scale(1); }
            }
          `}</style>
        </div>
      )}

      {/* Notificación */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.8 }}
            className={`fixed top-6 right-6 z-50 px-6 py-4 rounded-2xl shadow-2xl flex items-center backdrop-blur-xl border ${
              notification.type === 'error' ? 'bg-red-600/80 text-white border-red-500/50' :
              notification.type === 'success' ? 'bg-emerald-600/80 text-white border-emerald-500/50' :
              'bg-blue-600/80 text-white border-blue-500/50'
            }`}
          >
            <div className="text-2xl mr-3">
              {notification.type === 'error' ? '❌' : notification.type === 'success' ? '✅' : 'ℹ️'}
            </div>
            <span className="font-medium">{notification.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mensaje de error mejorado */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-500/20 backdrop-blur-xl border border-red-500/30 rounded-3xl p-8 mb-8 shadow-2xl max-w-2xl mx-auto z-30"
        >
          <div className="flex items-center">
            <div className="w-16 h-16 bg-red-500/30 rounded-2xl flex items-center justify-center mr-6">
              <span className="text-3xl">⚠️</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-red-300 mb-2 font-poppins">Error de Conexión</h3>
              <p className="text-red-200 text-lg">{error}</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default VitalMonitor;

// Componente funcional del chat bot
function ChatBotPanel({ patient }) {
  const [mensajes, setMensajes] = useState([
    {
      id: 1,
      texto: `¡Hola ${patient.nombre}! Escribe tu pulso y te diré como estás`,
      usuario: false,
      esBienvenida: true,
      imgBotUrl: './SalusIMG/1._Design3x redimensionado no back.png'
    }
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
  useEffect(() => {
    const chatDiv = document.getElementById('chat-messages-panel');
    if (chatDiv) chatDiv.scrollTop = chatDiv.scrollHeight;
  }, [mensajes]);
  return (
    <div className="flex-1 flex flex-col bg-[#23283a]/80">
      <div id="chat-messages-panel" style={{height:'340px',overflowY:'auto',padding:'18px',background:'#23283a'}}>
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

/* --- Scrollbar personalizado degradado --- */
<style jsx global>{`
  .custom-scrollbar::-webkit-scrollbar {
    width: 12px;
    background: #181e30;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: linear-gradient(to bottom, #1aff8b,hsl(155, 70.50%, 23.90%));
    border-radius: 8px;
    border: 2px solid #181e30;
  }
  .custom-scrollbar {
    scrollbar-color:rgba(27, 122, 75, 0.73) #181e30;
    scrollbar-width: thin;
  }
`}</style>