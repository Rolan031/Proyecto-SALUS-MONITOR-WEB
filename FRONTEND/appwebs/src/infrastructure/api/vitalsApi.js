import apiClient from './apiClient.js';
import { API_CONFIG } from './config.js';

class VitalsApi {
  // Obtener signos vitales de un paciente
  async getVitalsByPatient(patientId, limit = 100) {
    return apiClient.get(`${API_CONFIG.ROUTES.VITALS}/patient/${patientId}`, { limit });
  }

  // Guardar signos vitales desde sensor
  async saveSensorVitalData(vitalData) {
    return apiClient.post(`${API_CONFIG.ROUTES.VITALS}/sensor`, vitalData);
  }

  // Guardar signos vitales manualmente
  async saveManualVitalData(vitalData) {
    return apiClient.post(`${API_CONFIG.ROUTES.VITALS}/manual`, vitalData);
  }

  // Guardar múltiples signos vitales
  async saveMultipleVitals(vitalsData) {
    const promises = vitalsData.map(vital => this.saveManualVitalData(vital));
    return Promise.all(promises);
  }

  // Obtener estadísticas de signos vitales
  async getVitalsStats(patientId, timeRange = '24h') {
    return apiClient.get(`${API_CONFIG.ROUTES.VITALS}/stats/${patientId}`, { timeRange });
  }

  // Exportar datos de signos vitales
  async exportVitalsData(patientId, format = 'json') {
    return apiClient.get(`${API_CONFIG.ROUTES.VITALS}/export/${patientId}`, { format });
  }
}

export const vitalsApi = new VitalsApi();
export default vitalsApi; 