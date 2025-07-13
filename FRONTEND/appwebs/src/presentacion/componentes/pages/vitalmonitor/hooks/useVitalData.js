import { useState, useEffect, useCallback } from 'react';
import { useVitalMonitorContext } from '../../../../contexts/VitalMonitorContext';
import { WSClient } from '../../../../../infrastructure/api/wsClient';
import { API_CONFIG } from '../../../../../infrastructure/api/config.js';

export const useVitalData = (patientId) => {
  const { state, dispatch } = useVitalMonitorContext();
  const [currentSession, setCurrentSession] = useState(null);
  const [wsClient, setWsClient] = useState(null);

  const startMonitoring = useCallback(async () => {
    dispatch({ type: 'SET_MONITORING', payload: true });
    dispatch({ type: 'SET_CONNECTION', payload: false });
    dispatch({ type: 'CLEAR_ERROR' });

    const session = {
      id: Date.now(),
      patientId,
      startTime: new Date().toISOString(),
      endTime: null,
      isActive: true
    };
    setCurrentSession(session);

    const client = new WSClient(API_CONFIG.WS_URL);

    client.on('connect', () => {
      dispatch({ type: 'SET_CONNECTION', payload: true });
    });

    client.on('disconnect', () => {
      dispatch({ type: 'SET_CONNECTION', payload: false });
    });

    client.on('error', (err) => {
      dispatch({ type: 'SET_ERROR', payload: err.message || 'WebSocket error' });
    });

    // Nuevo handler: acepta mensajes de tipo VITAL_DATA y agrega el heartRate recibido
    client.on('message', (data) => {
      if (data?.type === 'VITAL_DATA' && data?.payload?.deviceId) {
        dispatch({ type: 'ADD_VITAL', payload: { ...data.payload, timestamp: Date.now() } });
      }
    });

    try {
      await client.connect();
      setWsClient(client);
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Error al conectar WebSocket' });
      dispatch({ type: 'SET_MONITORING', payload: false });
    }
  }, [dispatch, patientId]);

  const stopMonitoring = useCallback(async () => {
    dispatch({ type: 'SET_MONITORING', payload: false });
    dispatch({ type: 'SET_CONNECTION', payload: false });

    if (wsClient) {
      wsClient.disconnect();
      setWsClient(null);
    }

    if (currentSession) {
      setCurrentSession({
        ...currentSession,
        endTime: new Date().toISOString(),
        isActive: false
      });
    }
  }, [wsClient, currentSession, dispatch]);

  // Limpiar vitals al cambiar de paciente
  useEffect(() => {
    dispatch({ type: 'SET_VITALS', payload: [] });
  }, [patientId, dispatch]);

  useEffect(() => {
    return () => {
      if (wsClient) {
        wsClient.disconnect();
      }
    };
  }, [wsClient]);

  return {
    vitals: state.vitals,
    currentSession,
    isMonitoring: state.isMonitoring,
    isWsConnected: state.isConnected,
    error: state.error,
    startMonitoring,
    stopMonitoring
  };
};

export default useVitalData;