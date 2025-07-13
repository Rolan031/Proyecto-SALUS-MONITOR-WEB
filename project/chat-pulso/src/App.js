import React, { useState } from 'react';
import ChatMessage from './Componentes/ChatMessage';
import InputArea from './Componentes/InputArea';
import EstadisticasCard from './Componentes/EstadisticasCard';
import BackendConnection from './Componentes/BackendConnection';
import SystemInfo from './Componentes/SystemInfo';
import { useChatLogic } from './hooks/useChatLogic';

function App() {
  const {
    mensajes,
    inputTexto,
    setInputTexto,
    isTyping,
    historial,
    estadisticas,
    errores,
    configuracion,
    setConfiguracion,
    messagesEndRef,
    enviarMensaje,
    manejarTeclas,
    limpiarHistorial,
    exportarDatos,
    obtenerSugerencias,
    scrollToBottom,
    backendConnected,
    selectedPatient,
    backendData,
    seleccionarPaciente,
    recibirDatosBackend
  } = useChatLogic();

  const [mostrarEstadisticas, setMostrarEstadisticas] = useState(false);
  const [mostrarConfiguracion, setMostrarConfiguracion] = useState(false);
  const [mostrarBackend, setMostrarBackend] = useState(true);
  const [mostrarSystemInfo, setMostrarSystemInfo] = useState(false);

  return (
    <div className="fade-in-up" style={{
      maxWidth: '550px',
      width: '100%',
      margin: '0 auto',
      borderRadius: '24px',
      boxShadow: '0 20px 60px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.1)',
      fontFamily: '"Inter", sans-serif',
      overflow: 'hidden',
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.2)'
    }}>
      {/* Header mejorado */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '24px 20px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '-50%',
          left: '-50%',
          width: '200%',
          height: '200%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
          animation: 'pulse 4s ease-in-out infinite'
        }} />
        
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '12px'
        }}>
          <h2 style={{
            margin: '0',
            fontSize: '28px',
            fontWeight: '700',
            letterSpacing: '-0.5px',
            position: 'relative',
            zIndex: 1
          }}>
            💓 Salus Monitor
          </h2>
          
          <div style={{ display: 'flex', gap: '8px', position: 'relative', zIndex: 1 }}>
            <button
              onClick={() => setMostrarSystemInfo(true)}
              style={{
                padding: '8px 12px',
                background: 'rgba(255,255,255,0.2)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: '500',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(255,255,255,0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255,255,255,0.2)';
              }}
            >
              📊 Sistema
            </button>
            
            <button
              onClick={() => setMostrarBackend(!mostrarBackend)}
              style={{
                padding: '8px 12px',
                background: backendConnected ? 'rgba(16, 185, 129, 0.3)' : 'rgba(255,255,255,0.2)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: '500',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = backendConnected ? 'rgba(16, 185, 129, 0.4)' : 'rgba(255,255,255,0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = backendConnected ? 'rgba(16, 185, 129, 0.3)' : 'rgba(255,255,255,0.2)';
              }}
            >
              🔌 {mostrarBackend ? 'Ocultar' : 'Backend'}
            </button>
            
            <button
              onClick={() => setMostrarEstadisticas(!mostrarEstadisticas)}
              style={{
                padding: '8px 12px',
                background: 'rgba(255,255,255,0.2)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: '500',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(255,255,255,0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255,255,255,0.2)';
              }}
            >
              📊 {mostrarEstadisticas ? 'Ocultar' : 'Estadísticas'}
            </button>
            
            <button
              onClick={() => setMostrarConfiguracion(!mostrarConfiguracion)}
              style={{
                padding: '8px 12px',
                background: 'rgba(255,255,255,0.2)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: '500',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(255,255,255,0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255,255,255,0.2)';
              }}
            >
              ⚙️ Config
            </button>
          </div>
        </div>
        
        <p style={{
          margin: '8px 0 0 0',
          fontSize: '15px',
          opacity: '0.9',
          fontWeight: '400',
          position: 'relative',
          zIndex: 1
        }}>
          Tu asistente de salud cardíaca inteligente
          {backendConnected && ' - Conectado al Backend'}
        </p>
        
        <div style={{
          position: 'absolute',
          bottom: '0',
          left: '0',
          right: '0',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)'
        }} />
      </div>

      {/* Panel de configuración */}
      {mostrarConfiguracion && (
        <div style={{
          padding: '16px 20px',
          background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
          borderBottom: '1px solid rgba(229, 231, 235, 0.8)'
        }}>
          <h4 style={{
            margin: '0 0 12px 0',
            fontSize: '16px',
            fontWeight: '600',
            color: '#374151'
          }}>
            ⚙️ Configuración
          </h4>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '12px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <input
                type="checkbox"
                id="guardarHistorial"
                checked={configuracion.guardarHistorial}
                onChange={(e) => setConfiguracion(prev => ({
                  ...prev,
                  guardarHistorial: e.target.checked
                }))}
                style={{ width: '16px', height: '16px' }}
              />
              <label htmlFor="guardarHistorial" style={{
                fontSize: '14px',
                color: '#374151',
                cursor: 'pointer'
              }}>
                Guardar historial
              </label>
            </div>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <input
                type="checkbox"
                id="mostrarEstadisticas"
                checked={configuracion.mostrarEstadisticas}
                onChange={(e) => setConfiguracion(prev => ({
                  ...prev,
                  mostrarEstadisticas: e.target.checked
                }))}
                style={{ width: '16px', height: '16px' }}
              />
              <label htmlFor="mostrarEstadisticas" style={{
                fontSize: '14px',
                color: '#374151',
                cursor: 'pointer'
              }}>
                Mostrar estadísticas
              </label>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <input
                type="checkbox"
                id="conectarBackend"
                checked={configuracion.conectarBackend}
                onChange={(e) => setConfiguracion(prev => ({
                  ...prev,
                  conectarBackend: e.target.checked
                }))}
                style={{ width: '16px', height: '16px' }}
              />
              <label htmlFor="conectarBackend" style={{
                fontSize: '14px',
                color: '#374151',
                cursor: 'pointer'
              }}>
                Conectar al backend
              </label>
            </div>
          </div>
          
          <div style={{
            marginTop: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <label style={{
              fontSize: '14px',
              color: '#374151',
              fontWeight: '500'
            }}>
              Tiempo de respuesta:
            </label>
            <input
              type="range"
              min="500"
              max="3000"
              step="100"
              value={configuracion.tiempoRespuesta}
              onChange={(e) => setConfiguracion(prev => ({
                ...prev,
                tiempoRespuesta: parseInt(e.target.value)
              }))}
              style={{ flex: '1' }}
            />
            <span style={{
              fontSize: '12px',
              color: '#6b7280',
              minWidth: '40px'
            }}>
              {configuracion.tiempoRespuesta}ms
            </span>
          </div>
        </div>
      )}

      {/* Panel de conexión con backend */}
      {mostrarBackend && configuracion.conectarBackend && (
        <div style={{
          padding: '0 20px',
          background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)'
        }}>
          <BackendConnection
            onDataReceived={recibirDatosBackend}
            onConnectionChange={(connected) => {
              console.log('Estado de conexión backend:', connected);
            }}
          />
        </div>
      )}

      {/* Estadísticas */}
      {mostrarEstadisticas && estadisticas && (
        <div style={{
          padding: '0 20px',
          background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)'
        }}>
          <EstadisticasCard
            estadisticas={estadisticas}
            onLimpiar={limpiarHistorial}
            onExportar={exportarDatos}
          />
        </div>
      )}

      {/* Área de mensajes */}
      <div style={{
        height: mostrarEstadisticas && estadisticas ? '300px' : 
               mostrarBackend && configuracion.conectarBackend ? '350px' : '400px',
        overflowY: 'auto',
        padding: '20px',
        background: 'linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)',
        scrollBehavior: 'smooth'
      }}>
        {mensajes.map((m, index) => (
          <div key={m.id} className={m.usuario ? 'slide-out' : 'slide-in'} style={{ animationDelay: `${index * 0.1}s` }}>
            <ChatMessage mensaje={m} />
          </div>
        ))}
        
        {isTyping && (
          <div className="slide-in" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 16px',
            backgroundColor: 'white',
            borderRadius: '18px',
            maxWidth: '85%',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            border: '1px solid #e9ecef'
          }}>
            <div style={{ fontSize: '14px', color: '#666' }}>Analizando...</div>
            <div style={{ display: 'flex', gap: '4px' }}>
              <div style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#667eea',
                animation: 'pulse 1.4s ease-in-out infinite'
              }} />
              <div style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#667eea',
                animation: 'pulse 1.4s ease-in-out infinite 0.2s'
              }} />
              <div style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#667eea',
                animation: 'pulse 1.4s ease-in-out infinite 0.4s'
              }} />
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Notificaciones de error */}
      {errores.length > 0 && (
        <div style={{
          padding: '8px 20px',
          background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
          borderTop: '1px solid rgba(239, 68, 68, 0.2)',
          borderBottom: '1px solid rgba(239, 68, 68, 0.2)'
        }}>
          {errores.map(error => (
            <div key={error.id} style={{
              fontSize: '12px',
              color: '#dc2626',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              ⚠️ {error.mensaje}
            </div>
          ))}
        </div>
      )}

      <InputArea
        inputTexto={inputTexto}
        setInputTexto={setInputTexto}
        presionarEnter={manejarTeclas}
        enviarMensaje={enviarMensaje}
        isTyping={isTyping}
        sugerencias={obtenerSugerencias(inputTexto)}
      />

      {/* Modal de información del sistema */}
      <SystemInfo
        isVisible={mostrarSystemInfo}
        onClose={() => setMostrarSystemInfo(false)}
      />
    </div>
  );
}

export default App;