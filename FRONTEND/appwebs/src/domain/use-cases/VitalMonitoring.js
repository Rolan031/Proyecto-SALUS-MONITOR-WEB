import { API_CONFIG } from '../../infrastructure/api/config.js';

export class VitalMonitoring {
  constructor(apiClient) {
    this.api = apiClient;
  }

  async startSession(patientId) {
    return this.api.post(`${API_CONFIG.ROUTES.SESSIONS}/${patientId}/sessions`);
  }

  async endSession(sessionId, notes) {
    return this.api.put(`${API_CONFIG.ROUTES.SESSIONS}/sessions/${sessionId}/end`, { notes });
  }

  async getVitals(patientId, limit = 100) {
    return this.api.get(`${API_CONFIG.ROUTES.VITALS}/patient/${patientId}?limit=${limit}`);
  }

  // Para WebSocket
  async recordSensorVital(patientId, heartRate) {
    if (!this.api.wsClient) {
      throw new Error('WebSocket no conectado');
    }
    
    const data = {
      patientId,
      heartRate
    };
    
    return new Promise((resolve, reject) => {
      this.api.wsClient.send(JSON.stringify({
        type: "RECORD_VITAL",
        payload: data
      }));
      const handler = (message) => {
        const { type, payload } = JSON.parse(message.data);
        if (type === 'VITAL_SIGN_ACK') {
          this.api.wsClient.removeEventListener('message', handler);
          resolve(payload);
        } else if (type === 'ERROR') {
          this.api.wsClient.removeEventListener('message', handler);
          reject(new Error(payload.message));
        }
      };
      this.api.wsClient.addEventListener('message', handler);
    });
  }
}