// Servicio de API para conectar con el backend de Salus Monitor

const API_BASE_URL = 'http://localhost:3000/api';
const WS_URL = 'ws://localhost:3000/api/ws/vitals';

class ApiService {
  constructor() {
    this.ws = null;
    this.isConnected = false;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.listeners = new Map();
  }

  // ===== CONEXIÓN WEBSOCKET =====
  
  connectWebSocket(deviceId = 'chat-pulso') {
    try {
      this.ws = new WebSocket(WS_URL);
      
      // Configurar headers para identificar el dispositivo
      this.ws.onopen = () => {
        console.log(' WebSocket conectado al backend');
        this.isConnected = true;
        this.reconnectAttempts = 0;
        
        // Enviar identificación del dispositivo
        this.ws.send(JSON.stringify({
          type: 'IDENTIFY',
          payload: { deviceId }
        }));
      };

      this.ws.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          this.handleWebSocketMessage(message);
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };

      this.ws.onclose = () => {
        console.log('🔌 WebSocket desconectado');
        this.isConnected = false;
        this.handleReconnect();
      };

      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        this.isConnected = false;
      };

    } catch (error) {
      console.error('Error connecting to WebSocket:', error);
    }
  }

  handleReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      console.log(`🔄 Intentando reconectar... (${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
      
      setTimeout(() => {
        this.connectWebSocket();
      }, 2000 * this.reconnectAttempts); // Backoff exponencial
    } else {
      console.error('❌ Máximo de intentos de reconexión alcanzado');
    }
  }

  handleWebSocketMessage(message) {
    console.log('📨 Mensaje WebSocket recibido:', message);
    
    // Notificar a los listeners registrados
    if (this.listeners.has(message.type)) {
      this.listeners.get(message.type).forEach(callback => {
        callback(message.payload);
      });
    }
  }

  // Registrar listeners para diferentes tipos de mensajes
  onMessage(type, callback) {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, []);
    }
    this.listeners.get(type).push(callback);
  }

  // Remover listener
  offMessage(type, callback) {
    if (this.listeners.has(type)) {
      const callbacks = this.listeners.get(type);
      const index = callbacks.indexOf(callback);
      if (index > -1) {
        callbacks.splice(index, 1);
      }
    }
  }

  // ===== API REST =====

  async makeRequest(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`Error en API request a ${endpoint}:`, error);
      throw error;
    }
  }

  // ===== ENDPOINTS ESPECÍFICOS DEL CHAT =====

  // Analizar datos de signos vitales de un paciente
  async analyzeBackendVitals(patientId, limit = 10) {
    return this.makeRequest(`/chat/analyze/${patientId}?limit=${limit}`);
  }

  // Buscar pacientes por nombre o email
  async searchPatients(query) {
    return this.makeRequest(`/chat/search-patients?query=${encodeURIComponent(query)}`);
  }

  // Obtener estadísticas del sistema
  async getSystemStats() {
    return this.makeRequest('/chat/system-stats');
  }

  // Registrar análisis del chat
  async recordChatAnalysis(patientId, analysis, source = 'chat-pulso') {
    return this.makeRequest('/chat/chat-analysis', {
      method: 'POST',
      body: JSON.stringify({ patientId, analysis, source })
    });
  }

  // Obtener historial de análisis del chat
  async getChatHistory(patientId = null, limit = 50) {
    const endpoint = patientId ? `/chat/chat-history/${patientId}` : '/chat/chat-history';
    return this.makeRequest(`${endpoint}?limit=${limit}`);
  }

  // Obtener datos en tiempo real de un paciente
  async getRealTimeData(patientId) {
    return this.makeRequest(`/chat/realtime/${patientId}`);
  }

  // ===== ENDPOINTS DE SIGNOS VITALES =====

  // Obtener signos vitales de un paciente
  async getVitalsByPatient(patientId, limit = 100) {
    return this.makeRequest(`/vitals/patient/${patientId}?limit=${limit}`);
  }

  // Registrar signos vitales manualmente
  async recordVitalSigns(data) {
    return this.makeRequest('/vitals/manual', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  // Registrar desde sensor (simulación)
  async recordFromSensor(data) {
    return this.makeRequest('/vitals/sensor', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  // ===== ENDPOINTS DE PACIENTES =====

  // Obtener todos los pacientes
  async getPatients() {
    return this.makeRequest('/clientes');
  }

  // Obtener un paciente específico
  async getPatient(patientId) {
    return this.makeRequest(`/clientes/${patientId}`);
  }

  // Crear un nuevo paciente
  async createPatient(patientData) {
    return this.makeRequest('/clientes', {
      method: 'POST',
      body: JSON.stringify(patientData)
    });
  }

  // ===== ENDPOINTS DE SESIONES =====

  // Obtener sesiones de un paciente
  async getSessions(patientId) {
    return this.makeRequest(`/sessions/patient/${patientId}`);
  }

  // Crear una nueva sesión
  async createSession(sessionData) {
    return this.makeRequest('/sessions', {
      method: 'POST',
      body: JSON.stringify(sessionData)
    });
  }

  // ===== ENDPOINTS DE DISPOSITIVOS =====

  // Obtener dispositivos
  async getDevices() {
    return this.makeRequest('/devices');
  }

  // Asociar dispositivo a paciente
  async associateDevice(deviceId, patientId) {
    return this.makeRequest(`/devices/${deviceId}/associate`, {
      method: 'PUT',
      body: JSON.stringify({ patientId })
    });
  }

  // ===== FUNCIONES ESPECÍFICAS PARA EL CHAT =====

  // Analizar datos de signos vitales del backend (versión mejorada)
  async analyzeBackendVitalsEnhanced(patientId, limit = 10) {
    try {
      const analysis = await this.analyzeBackendVitals(patientId, limit);
      
      if (!analysis.success) {
        return analysis;
      }

      // Agregar información adicional
      const enhancedData = {
        ...analysis.data,
        analysis: {
          status: this.getHeartRateStatus(analysis.data.current),
          trend: this.calculateTrend(analysis.data.vitals),
          recommendations: this.generateRecommendations(analysis.data)
        }
      };

      return {
        ...analysis,
        data: enhancedData
      };
      
    } catch (error) {
      console.error('Error analizando datos del backend:', error);
      return {
        success: false,
        message: 'Error al obtener datos del backend'
      };
    }
  }

  // Obtener estado de la frecuencia cardíaca
  getHeartRateStatus(heartRate) {
    if (heartRate < 60) return 'bradicardia';
    if (heartRate > 100) return 'taquicardia';
    return 'normal';
  }

  // Calcular tendencia de los datos
  calculateTrend(vitals) {
    if (vitals.length < 2) return 'estable';
    
    const recent = vitals.slice(0, 3);
    const older = vitals.slice(3, 6);
    
    if (recent.length === 0 || older.length === 0) return 'estable';
    
    const recentAvg = recent.reduce((a, b) => a + b.heartRate, 0) / recent.length;
    const olderAvg = older.reduce((a, b) => a + b.heartRate, 0) / older.length;
    
    const difference = recentAvg - olderAvg;
    
    if (difference > 10) return 'ascendente';
    if (difference < -10) return 'descendente';
    return 'estable';
  }

  // Generar recomendaciones basadas en los datos
  generateRecommendations(data) {
    const recommendations = [];
    
    if (data.current < 60) {
      recommendations.push('Considera consultar con un médico por bradicardia');
    } else if (data.current > 100) {
      recommendations.push('Considera técnicas de relajación para taquicardia');
    }
    
    if (data.average > 90) {
      recommendations.push('Tu frecuencia cardíaca promedio está elevada');
    }
    
    if (data.max - data.min > 30) {
      recommendations.push('Hay mucha variabilidad en tu frecuencia cardíaca');
    }
    
    return recommendations;
  }

  // Buscar paciente por nombre o ID (versión mejorada)
  async searchPatient(query) {
    try {
      if (!query || query.trim() === '') {
        return null;
      }

      const patients = await this.searchPatients(query.trim());
      return patients.length > 0 ? patients[0] : null;
    } catch (error) {
      console.error('Error buscando paciente:', error);
      return null;
    }
  }

  // Obtener datos en tiempo real del WebSocket
  async getRealTimeDataWebSocket(patientId) {
    return new Promise((resolve, reject) => {
      if (!this.isConnected) {
        reject(new Error('WebSocket no conectado'));
        return;
      }

      // Enviar solicitud de datos en tiempo real
      this.ws.send(JSON.stringify({
        type: 'GET_REALTIME_DATA',
        payload: { patientId }
      }));

      // Configurar timeout
      const timeout = setTimeout(() => {
        reject(new Error('Timeout esperando datos en tiempo real'));
      }, 10000);

      // Escuchar respuesta
      const listener = (data) => {
        clearTimeout(timeout);
        this.offMessage('REALTIME_DATA', listener);
        resolve(data);
      };

      this.onMessage('REALTIME_DATA', listener);
    });
  }

  // Verificar estado del servidor
  async checkServerStatus() {
    try {
      const status = await this.makeRequest('/status');
      return status;
    } catch (error) {
      return {
        status: 'error',
        message: 'Servidor no disponible'
      };
    }
  }

  // ===== UTILIDADES =====

  // Verificar conexión
  isBackendConnected() {
    return this.isConnected;
  }

  // Desconectar WebSocket
  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
      this.isConnected = false;
    }
  }

  // Obtener estado de conexión
  getConnectionStatus() {
    return {
      isConnected: this.isConnected,
      reconnectAttempts: this.reconnectAttempts,
      maxReconnectAttempts: this.maxReconnectAttempts
    };
  }
}

// Crear instancia singleton
const apiService = new ApiService();

export default apiService;