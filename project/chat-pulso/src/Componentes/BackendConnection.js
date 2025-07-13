import React, { useState, useEffect } from 'react';
import apiService from '../services/apiService';

function BackendConnection({ onDataReceived, onConnectionChange }) {
  const [connectionStatus, setConnectionStatus] = useState({
    isConnected: false,
    reconnectAttempts: 0,
    maxReconnectAttempts: 5
  });
  
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lastData, setLastData] = useState(null);

  useEffect(() => {
    // Conectar al WebSocket al montar el componente
    apiService.connectWebSocket('chat-pulso');
    
    // Escuchar cambios de conexión
    const checkConnection = () => {
      const status = apiService.getConnectionStatus();
      setConnectionStatus(status);
      onConnectionChange?.(status.isConnected);
    };

    // Verificar conexión cada 2 segundos
    const interval = setInterval(checkConnection, 2000);
    
    // Escuchar datos en tiempo real
    apiService.onMessage('VITAL_DATA', handleVitalData);
    apiService.onMessage('REALTIME_DATA', handleRealTimeData);

    // Cargar pacientes al conectar
    if (apiService.isBackendConnected()) {
      loadPatients();
    }

    return () => {
      clearInterval(interval);
      apiService.offMessage('VITAL_DATA', handleVitalData);
      apiService.offMessage('REALTIME_DATA', handleRealTimeData);
    };
  }, []);

  const handleVitalData = (data) => {
    console.log('📊 Datos vitales recibidos:', data);
    setLastData(data);
    onDataReceived?.(data);
  };

  const handleRealTimeData = (data) => {
    console.log('⚡ Datos en tiempo real recibidos:', data);
    setLastData(data);
    onDataReceived?.(data);
  };

  const loadPatients = async () => {
    try {
      setIsLoading(true);
      const patientsData = await apiService.getPatients();
      setPatients(patientsData);
    } catch (error) {
      console.error('Error cargando pacientes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePatientSelect = async (patientId) => {
    try {
      setIsLoading(true);
      const patient = patients.find(p => p.id === patientId);
      setSelectedPatient(patient);
      
      // Analizar datos del paciente
      const analysis = await apiService.analyzeBackendVitals(patientId);
      if (analysis.success) {
        onDataReceived?.(analysis.data);
      }
    } catch (error) {
      console.error('Error analizando paciente:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshData = async () => {
    if (selectedPatient) {
      await handlePatientSelect(selectedPatient.id);
    } else {
      await loadPatients();
    }
  };

  return (
    <div style={{
      padding: '16px',
      background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
      borderRadius: '12px',
      border: '1px solid rgba(59, 130, 246, 0.2)',
      marginBottom: '16px'
    }}>
      {/* Estado de conexión */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '16px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <div style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            backgroundColor: connectionStatus.isConnected ? '#10b981' : '#ef4444',
            animation: connectionStatus.isConnected ? 'pulse 2s infinite' : 'none'
          }} />
          <span style={{
            fontSize: '14px',
            fontWeight: '600',
            color: '#374151'
          }}>
            {connectionStatus.isConnected ? 'Conectado al Backend' : 'Desconectado'}
          </span>
        </div>
        
        <button
          onClick={refreshData}
          disabled={isLoading}
          style={{
            padding: '6px 12px',
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '12px',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            opacity: isLoading ? 0.6 : 1,
            transition: 'all 0.2s ease'
          }}
        >
          {isLoading ? '⏳' : '🔄'} Actualizar
        </button>
      </div>

      {/* Información de reconexión */}
      {!connectionStatus.isConnected && connectionStatus.reconnectAttempts > 0 && (
        <div style={{
          padding: '8px 12px',
          background: 'rgba(245, 158, 11, 0.1)',
          borderRadius: '8px',
          border: '1px solid rgba(245, 158, 11, 0.2)',
          marginBottom: '12px'
        }}>
          <div style={{
            fontSize: '12px',
            color: '#92400e',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            🔄 Reconectando... ({connectionStatus.reconnectAttempts}/{connectionStatus.maxReconnectAttempts})
          </div>
        </div>
      )}

      {/* Selector de paciente */}
      {connectionStatus.isConnected && (
        <div style={{ marginBottom: '12px' }}>
          <label style={{
            fontSize: '14px',
            fontWeight: '600',
            color: '#374151',
            marginBottom: '8px',
            display: 'block'
          }}>
            👤 Seleccionar Paciente:
          </label>
          
          <select
            value={selectedPatient?.id || ''}
            onChange={(e) => handlePatientSelect(e.target.value)}
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '14px',
              backgroundColor: 'white',
              cursor: isLoading ? 'not-allowed' : 'pointer'
            }}
          >
            <option value="">-- Seleccionar paciente --</option>
            {patients.map(patient => (
              <option key={patient.id} value={patient.id}>
                {patient.name || `Paciente ${patient.id}`} 
                {patient.email && ` (${patient.email})`}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Datos del paciente seleccionado */}
      {selectedPatient && (
        <div style={{
          padding: '12px',
          background: 'rgba(255,255,255,0.8)',
          borderRadius: '8px',
          border: '1px solid rgba(255,255,255,0.9)',
          marginBottom: '12px'
        }}>
          <div style={{
            fontSize: '14px',
            fontWeight: '600',
            color: '#374151',
            marginBottom: '8px'
          }}>
            📋 Paciente Seleccionado:
          </div>
          
          <div style={{
            fontSize: '12px',
            color: '#6b7280',
            lineHeight: '1.4'
          }}>
            <div><strong>ID:</strong> {selectedPatient.id}</div>
            {selectedPatient.name && <div><strong>Nombre:</strong> {selectedPatient.name}</div>}
            {selectedPatient.email && <div><strong>Email:</strong> {selectedPatient.email}</div>}
            {selectedPatient.phone && <div><strong>Teléfono:</strong> {selectedPatient.phone}</div>}
          </div>
        </div>
      )}

      {/* Últimos datos recibidos */}
      {lastData && (
        <div style={{
          padding: '12px',
          background: 'rgba(16, 185, 129, 0.1)',
          borderRadius: '8px',
          border: '1px solid rgba(16, 185, 129, 0.2)'
        }}>
          <div style={{
            fontSize: '14px',
            fontWeight: '600',
            color: '#065f46',
            marginBottom: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            📊 Últimos Datos:
          </div>
          
          <div style={{
            fontSize: '12px',
            color: '#065f46',
            lineHeight: '1.4'
          }}>
            {lastData.current && (
              <div><strong>Frecuencia actual:</strong> {lastData.current} BPM</div>
            )}
            {lastData.average && (
              <div><strong>Promedio:</strong> {lastData.average} BPM</div>
            )}
            {lastData.totalRecords && (
              <div><strong>Total registros:</strong> {lastData.totalRecords}</div>
            )}
            {lastData.lastUpdate && (
              <div><strong>Última actualización:</strong> {new Date(lastData.lastUpdate).toLocaleString('es-ES')}</div>
            )}
          </div>
        </div>
      )}

      {/* Instrucciones */}
      {connectionStatus.isConnected && !selectedPatient && (
        <div style={{
          padding: '8px 12px',
          background: 'rgba(59, 130, 246, 0.1)',
          borderRadius: '8px',
          border: '1px solid rgba(59, 130, 246, 0.2)',
          fontSize: '12px',
          color: '#1e40af',
          textAlign: 'center'
        }}>
          💡 Selecciona un paciente para analizar sus datos de signos vitales
        </div>
      )}
    </div>
  );
}

export default BackendConnection;