// src/infrastructure/api/wsClient.js
export class WSClient {
  constructor(url) {
    this.url = url;
    this.client = null;
    this.isConnected = false;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.reconnectDelay = 1000;
    this.listeners = new Map();
    this.shouldReconnect = true;
  }

  async connect() {
    if (this.client) this.disconnect();

    console.log(`🔄 Conectando a WebSocket: ${this.url}`);

    return new Promise((resolve, reject) => {
      let timeout = setTimeout(() => {
        if (!this.isConnected) {
          this.client?.close();
          reject(new Error('Connection timeout'));
        }
      }, 5000);

      try {
        this.client = new WebSocket(this.url);

        this.client.onopen = (event) => {
          clearTimeout(timeout);
          this.isConnected = true;
          this.reconnectAttempts = 0;
          console.log('✅ WebSocket conectado exitosamente');
          this.emit('connect', event);
          resolve();
        };

        this.client.onmessage = (event) => {
          console.log('📨 Mensaje recibido:', event.data);
          try {
            const data = JSON.parse(event.data);
            this.emit('message', data);
          } catch (error) {
            console.warn('⚠️ Error parsing message:', error);
            this.emit('message', event.data);
          }
        };

        this.client.onclose = (event) => {
          this.isConnected = false;
          console.log('🔌 WebSocket desconectado:', event.code, event.reason);
          this.emit('disconnect', event);
          if (this.shouldReconnect) this.handleReconnect();
        };

        this.client.onerror = (error) => {
          clearTimeout(timeout);
          console.error('❌ Error en WebSocket:', error);
          this.emit('error', error);
          reject(error);
        };
      } catch (error) {
        console.error('❌ Error creando WebSocket:', error);
        reject(error);
      }
    });
  }

  disconnect() {
    console.log('🛑 Desconectando WebSocket');
    this.shouldReconnect = false;
    if (this.client) {
      this.client.close();
      this.client = null;
      this.isConnected = false;
    }
  }

  send(data) {
    if (this.client && this.client.readyState === WebSocket.OPEN) {
      const payload = typeof data === 'string' ? data : JSON.stringify(data);
      console.log('📤 Enviando mensaje:', payload);
      this.client.send(payload);
    } else {
      console.warn('⚠️ WebSocket no está conectado');
    }
  }

  on(event, callback) {
    if (!this.listeners.has(event)) this.listeners.set(event, []);
    this.listeners.get(event).push(callback);
  }

  off(event, callback) {
    if (this.listeners.has(event)) {
      const list = this.listeners.get(event).filter(fn => fn !== callback);
      this.listeners.set(event, list);
    }
  }

  once(event, callback) {
    const wrapper = (data) => {
      this.off(event, wrapper);
      callback(data);
    };
    this.on(event, wrapper);
  }

  emit(event, data) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).forEach(callback => {
        try {
          callback(data);
        } catch (err) {
          console.error('Error in callback:', err);
        }
      });
    }
  }

  handleReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      console.log(`🔄 Reintentando conexión (${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
      setTimeout(() => {
        this.connect().catch(err => console.error('Reconnection failed:', err));
      }, this.reconnectDelay * this.reconnectAttempts);
    } else {
      console.error('❌ Máximo de reintentos alcanzado');
    }
  }

  getConnectionStatus() {
    return this.isConnected;
  }
}
