import { WebSocketServer } from 'ws';
import { PrismaClient } from '@prisma/client';

export class VitalSignsWebSocket {
  constructor(server) {
    this.prisma = new PrismaClient();
    this.wss = new WebSocketServer({
      server,
      path: '/api/ws/vitals'
    });
    this.activeConnections = new Map();
  }

  async init() {
    this.wss.on('connection', (ws, req) => {
      const deviceId = req.headers['device-id'] || 'unknown';
      console.log(`Dispositivo conectado: ${deviceId}`);

      this.activeConnections.set(deviceId, ws);

      ws.on('message', async (data) => {
        try {
          const message = JSON.parse(data);
          await this.handleMessage(message, ws, deviceId);
        } catch (error) {
          console.error('Error procesando mensaje:', error);
          ws.send(JSON.stringify({
            type: 'ERROR',
            payload: { message: error.message }
          }));
        }
      });

      ws.on('close', () => {
        this.activeConnections.delete(deviceId);
        console.log(`Dispositivo desconectado: ${deviceId}`);
      });
    });
  }

  async handleMessage(message, ws, deviceId) {
    switch (message.type) {
      case 'VITAL_DATA':
        await this.handleVitalData(message.payload, deviceId);
        ws.send(JSON.stringify({
          type: 'ACK',
          payload: { received: true }
        }));
        break;

      case 'RECORD_VITAL':
        const vitalSign = await this.handleVitalData(message.payload, deviceId);
        ws.send(JSON.stringify({
          type: 'VITAL_SIGN_ACK',
          payload: { id: vitalSign.id }
        }));
        break;

      default:
        throw new Error('Tipo de mensaje no soportado');
    }
  }

  async handleVitalData(data, deviceId) {
  // 🔥 CAMBIO CLAVE: Usar deviceId del payload si existe
  const actualDeviceId = data.deviceId || deviceId;
  
  console.log('🔍 Buscando dispositivo con ID:', actualDeviceId);
  
  // Buscar el paciente asociado al deviceId
  const device = await this.prisma.device.findUnique({
    where: { deviceId: actualDeviceId }
  });
  
  console.log('📱 Dispositivo encontrado:', device);
  
  if (!device || !device.patientId) {
    throw new Error(`Dispositivo ${actualDeviceId} no asociado a ningún paciente`);
  }
  
  const vitalSign = await this.prisma.signosVitales.create({
    data: {
      patientId: device.patientId,
      heartRate: data.heartRate,
      //source: 'sensor',
      informe: `Dispositivo: ${actualDeviceId}`
    }
  });
  
  console.log('✅ Signo vital creado:', vitalSign);
  return vitalSign;
}

  async shutdown() {
    await this.prisma.$disconnect();
    this.wss.close();
    console.log('WebSocket y Prisma desconectados correctamente');
  }
}
