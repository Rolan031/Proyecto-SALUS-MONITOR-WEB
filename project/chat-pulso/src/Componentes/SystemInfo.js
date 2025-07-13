import React, { useState, useEffect } from 'react';
import apiService from '../services/apiService';

function SystemInfo({ isVisible, onClose }) {
  const [systemStats, setSystemStats] = useState(null);
  const [serverStatus, setServerStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(null);

  useEffect(() => {
    if (isVisible) {
      loadSystemInfo();
    }
  }, [isVisible]);

  const loadSystemInfo = async () => {
    try {
      setIsLoading(true);
      
      // Cargar estadísticas del sistema y estado del servidor en paralelo
      const [stats, status] = await Promise.all([
        apiService.getSystemStats(),
        apiService.checkServerStatus()
      ]);
      
      setSystemStats(stats);
      setServerStatus(status);
      setLastUpdate(new Date());
      
    } catch (error) {
      console.error('Error cargando información del sistema:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      backdropFilter: 'blur(4px)'
    }}>
      <div style={{
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        borderRadius: '16px',
        padding: '24px',
        maxWidth: '500px',
        width: '90%',
        maxHeight: '80vh',
        overflowY: 'auto',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        border: '1px solid rgba(255,255,255,0.2)',
        position: 'relative'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
          paddingBottom: '12px',
          borderBottom: '1px solid rgba(0,0,0,0.1)'
        }}>
          <h3 style={{
            margin: 0,
            fontSize: '20px',
            fontWeight: '600',
            color: '#374151'
          }}>
            📊 Información del Sistema
          </h3>
          
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '20px',
              cursor: 'pointer',
              color: '#6b7280',
              padding: '4px',
              borderRadius: '4px',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.color = '#ef4444';
              e.target.style.background = 'rgba(239, 68, 68, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.target.style.color = '#6b7280';
              e.target.style.background = 'none';
            }}
          >
            ✕
          </button>
        </div>

        {/* Estado del servidor */}
        <div style={{
          padding: '16px',
          background: 'rgba(255,255,255,0.8)',
          borderRadius: '12px',
          marginBottom: '16px',
          border: '1px solid rgba(255,255,255,0.9)'
        }}>
          <h4 style={{
            margin: '0 0 12px 0',
            fontSize: '16px',
            fontWeight: '600',
            color: '#374151',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            🔌 Estado del Servidor
          </h4>
          
          {isLoading ? (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: '#6b7280'
            }}>
              <div style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: '#3b82f6',
                animation: 'pulse 1s infinite'
              }} />
              Cargando...
            </div>
          ) : serverStatus ? (
            <div style={{ fontSize: '14px', color: '#374151' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '8px'
              }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: serverStatus.status === 'active' ? '#10b981' : '#ef4444'
                }} />
                <strong>Estado:</strong> {serverStatus.status === 'active' ? 'Activo' : 'Inactivo'}
              </div>
              
              {serverStatus.version && (
                <div><strong>Versión:</strong> {serverStatus.version}</div>
              )}
              
              {serverStatus.timestamp && (
                <div><strong>Última verificación:</strong> {new Date(serverStatus.timestamp).toLocaleString('es-ES')}</div>
              )}
              
              {serverStatus.services && (
                <div style={{ marginTop: '8px' }}>
                  <strong>Servicios:</strong>
                  <div style={{ marginLeft: '16px', fontSize: '12px' }}>
                    {Object.entries(serverStatus.services).map(([service, status]) => (
                      <div key={service} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}>
                        <div style={{
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          backgroundColor: status === 'running' ? '#10b981' : '#ef4444'
                        }} />
                        {service}: {status === 'running' ? 'Ejecutándose' : 'Detenido'}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div style={{ color: '#ef4444', fontSize: '14px' }}>
              ❌ No se pudo obtener el estado del servidor
            </div>
          )}
        </div>

        {/* Estadísticas del sistema */}
        {systemStats && systemStats.success && (
          <div style={{
            padding: '16px',
            background: 'rgba(255,255,255,0.8)',
            borderRadius: '12px',
            marginBottom: '16px',
            border: '1px solid rgba(255,255,255,0.9)'
          }}>
            <h4 style={{
              margin: '0 0 12px 0',
              fontSize: '16px',
              fontWeight: '600',
              color: '#374151',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              📈 Estadísticas del Sistema
            </h4>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
              gap: '12px',
              fontSize: '14px'
            }}>
              <div style={{
                padding: '8px',
                background: 'rgba(59, 130, 246, 0.1)',
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '20px', fontWeight: '700', color: '#1d4ed8' }}>
                  {systemStats.data.totalPatients}
                </div>
                <div style={{ fontSize: '12px', color: '#6b7280' }}>Pacientes</div>
              </div>
              
              <div style={{
                padding: '8px',
                background: 'rgba(16, 185, 129, 0.1)',
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '20px', fontWeight: '700', color: '#065f46' }}>
                  {systemStats.data.totalVitals}
                </div>
                <div style={{ fontSize: '12px', color: '#6b7280' }}>Registros</div>
              </div>
              
              <div style={{
                padding: '8px',
                background: 'rgba(245, 158, 11, 0.1)',
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '20px', fontWeight: '700', color: '#92400e' }}>
                  {systemStats.data.totalSessions}
                </div>
                <div style={{ fontSize: '12px', color: '#6b7280' }}>Sesiones</div>
              </div>
              
              <div style={{
                padding: '8px',
                background: 'rgba(139, 92, 246, 0.1)',
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '20px', fontWeight: '700', color: '#5b21b6' }}>
                  {systemStats.data.totalDevices}
                </div>
                <div style={{ fontSize: '12px', color: '#6b7280' }}>Dispositivos</div>
              </div>
            </div>
            
            <div style={{
              marginTop: '12px',
              padding: '8px',
              background: 'rgba(239, 68, 68, 0.1)',
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '16px', fontWeight: '600', color: '#dc2626' }}>
                {systemStats.data.averageHeartRate} BPM
              </div>
              <div style={{ fontSize: '12px', color: '#6b7280' }}>Promedio General</div>
            </div>
            
            {systemStats.data.lastUpdate && (
              <div style={{
                marginTop: '8px',
                fontSize: '12px',
                color: '#6b7280',
                textAlign: 'center'
              }}>
                Última actualización: {new Date(systemStats.data.lastUpdate).toLocaleString('es-ES')}
              </div>
            )}
          </div>
        )}

        {/* Información de conexión */}
        <div style={{
          padding: '16px',
          background: 'rgba(255,255,255,0.8)',
          borderRadius: '12px',
          marginBottom: '16px',
          border: '1px solid rgba(255,255,255,0.9)'
        }}>
          <h4 style={{
            margin: '0 0 12px 0',
            fontSize: '16px',
            fontWeight: '600',
            color: '#374151',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            🔗 Información de Conexión
          </h4>
          
          <div style={{ fontSize: '14px', color: '#374151' }}>
            <div><strong>Backend URL:</strong> {apiService.API_BASE_URL || 'http://localhost:3000/api'}</div>
            <div><strong>WebSocket URL:</strong> {apiService.WS_URL || 'ws://localhost:3000/api/ws/vitals'}</div>
            <div><strong>Estado WebSocket:</strong> {apiService.isBackendConnected() ? 'Conectado' : 'Desconectado'}</div>
            {lastUpdate && (
              <div><strong>Última actualización:</strong> {lastUpdate.toLocaleString('es-ES')}</div>
            )}
          </div>
        </div>

        {/* Botones de acción */}
        <div style={{
          display: 'flex',
          gap: '12px',
          justifyContent: 'flex-end'
        }}>
          <button
            onClick={loadSystemInfo}
            disabled={isLoading}
            style={{
              padding: '8px 16px',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              opacity: isLoading ? 0.6 : 1,
              transition: 'all 0.2s ease'
            }}
          >
            {isLoading ? '⏳' : '🔄'} Actualizar
          </button>
          
          <button
            onClick={onClose}
            style={{
              padding: '8px 16px',
              background: 'rgba(107, 114, 128, 0.1)',
              color: '#374151',
              border: '1px solid rgba(107, 114, 128, 0.2)',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(107, 114, 128, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(107, 114, 128, 0.1)';
            }}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}

export default SystemInfo;