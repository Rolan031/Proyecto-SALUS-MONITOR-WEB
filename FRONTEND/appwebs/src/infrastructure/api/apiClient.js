import axios from 'axios';
import { API_CONFIG } from './config.js';

class Apipacient {
constructor(baseURL = API_CONFIG.HTTP_BASE_URL) {
    this.pacient = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  setAuthToken(token) {
    this.pacient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  clearAuthToken() {
    delete this.pacient.defaults.headers.common['Authorization'];
  }

  async get(endpoint, params = {}) {
    const response = await this.pacient.get(endpoint, { params });
    return response.data;
  }

  async post(endpoint, data = {}) {
    const response = await this.pacient.post(endpoint, data);
    return response.data;
  }

  async put(endpoint, data = {}) {
    const response = await this.pacient.put(endpoint, data);
    return response.data;
  }

  async patch(endpoint, data = {}) {
    const response = await this.pacient.patch(endpoint, data);
    return response.data;
  }

  async delete(endpoint) {
    const response = await this.pacient.delete(endpoint);
    return response.data;
  }

  // Métodos específicos para tu app
}

export const apipacient = new Apipacient();
export default apipacient;
