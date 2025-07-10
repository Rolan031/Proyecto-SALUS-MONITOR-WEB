import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import { VitalSignsWebSocket } from './infrastructure/ws/VitalSignsWebSocket.js';

import clienteRoutes from './infrastructure/web/routes/ClienteRoutes.js';
import sessionRoutes from './infrastructure/web/routes/SessionRoutes.js';
import vitalsRoutes from './infrastructure/web/routes/vitals.routes.js';
import deviceRoutes from './infrastructure/web/routes/DeviceRoutes.js';

const app = express();

// Middleware CORS
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

app.use(express.json());

// Rutas REST
app.use('/api/clientes', clienteRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/vitals', vitalsRoutes);
app.use('/api/devices', deviceRoutes);

app.get('/', (req, res) => {
  res.send('Servidor HTTP y WebSocket en puerto 3000');
});

// Middleware de errores
app.use((error, req, res, next) => {
  console.error('Error:', error);
  res.status(500).json({ error: 'Error interno del servidor' });
});

// Crear servidor HTTP (Express + WebSocket en uno)
const server = createServer(app);

// Iniciar servicio WebSocket sobre mismo servidor
const wsService = new VitalSignsWebSocket(server);
wsService.init();

// Iniciar todo en el puerto 3000
server.listen(3000, () => {
  console.log('✅ Servidor HTTP + WebSocket escuchando en puerto 3000');
});

// Apagar limpia cuando se cierre
process.on('SIGINT', async () => {
  await wsService.shutdown();
  server.close(() => {
    console.log('🛑 Servidor cerrado correctamente');
    process.exit();
  });
});
