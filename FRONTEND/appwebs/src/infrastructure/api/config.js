// Configuración del backend
export const API_CONFIG = {
  // URL base del servidor HTTP
  HTTP_BASE_URL: 'http://localhost:3000',
  
  // URL del WebSocket (ahora en el mismo puerto que HTTP)
  WS_URL: 'ws://localhost:3000/api/ws/vitals',
  
  // Rutas de la API
  ROUTES: {
    PATIENTS: '/api/clientes',
    SESSIONS: '/api/sessions',
    VITALS: '/api/vitals'
  }
};

// Configuración del entorno
export const ENV_CONFIG = {
  NODE_ENV: import.meta.env.MODE || 'development',
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || API_CONFIG.HTTP_BASE_URL
}; 