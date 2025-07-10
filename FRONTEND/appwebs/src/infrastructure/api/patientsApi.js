import apiClient from './apiClient.js';
import { API_CONFIG } from './config.js';

class PatientsApi {
  // Obtener todos los pacientes
  async getAllPatients() {
    return apiClient.get(API_CONFIG.ROUTES.PATIENTS);
  }

  // Obtener un paciente por ID
  async getPatientById(patientId) {
    return apiClient.get(`${API_CONFIG.ROUTES.PATIENTS}/${patientId}`);
  }

  // Crear un nuevo paciente
  async createPatient(patientData) {
    return apiClient.post(API_CONFIG.ROUTES.PATIENTS, patientData);
  }

  // Actualizar un paciente
  async updatePatient(patientId, patientData) {
    return apiClient.put(`${API_CONFIG.ROUTES.PATIENTS}/${patientId}`, patientData);
  }

  // Eliminar un paciente
  async deletePatient(patientId) {
    return apiClient.delete(`${API_CONFIG.ROUTES.PATIENTS}/${patientId}`);
  }

  // Buscar pacientes por nombre
  async searchPatients(query) {
    return apiClient.get(`${API_CONFIG.ROUTES.PATIENTS}/search`, { query });
  }
}

export const patientsApi = new PatientsApi();
export default patientsApi; 