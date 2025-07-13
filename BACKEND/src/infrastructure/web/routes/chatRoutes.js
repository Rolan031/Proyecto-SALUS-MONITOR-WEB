import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Obtener análisis de signos vitales para un paciente
router.get('/analyze/:patientId', async (req, res) => {
  try {
    const { patientId } = req.params;
    const limit = parseInt(req.query.limit) || 10;

    // Obtener los últimos signos vitales del paciente
    const vitals = await prisma.signosVitales.findMany({
      where: { patientId: parseInt(patientId) },
      orderBy: { createdAt: 'desc' },
      take: limit
    });

    if (!vitals || vitals.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No se encontraron datos de signos vitales para este paciente'
      });
    }

    // Calcular estadísticas
    const heartRates = vitals.map(v => v.heartRate).filter(rate => rate != null);
    const average = heartRates.length > 0 ? 
      Math.round(heartRates.reduce((a, b) => a + b, 0) / heartRates.length) : 0;
    
    const min = Math.min(...heartRates);
    const max = Math.max(...heartRates);

    // Obtener información del paciente
    const patient = await prisma.pacient.findUnique({
      where: { id: parseInt(patientId) }
    });

    const analysis = {
      success: true,
      data: {
        current: vitals[0].heartRate,
        average,
        min,
        max,
        totalRecords: vitals.length,
        lastUpdate: vitals[0].createdAt,
        patientId: parseInt(patientId),
        patient: patient ? {
          id: patient.id,
          name: patient.name,
          email: patient.email,
          phone: patient.phone
        } : null,
        vitals: vitals.slice(0, 5).map(v => ({
          id: v.id,
          heartRate: v.heartRate,
          createdAt: v.createdAt,
          source: v.source
        }))
      }
    };

    res.json(analysis);

  } catch (error) {
    console.error('Error analizando datos del paciente:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

// Buscar pacientes por nombre o email
router.get('/search-patients', async (req, res) => {
  try {
    const { query } = req.query;
    
    if (!query) {
      return res.json([]);
    }

    const patients = await prisma.pacient.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { email: { contains: query, mode: 'insensitive' } }
        ]
      },
      take: 10
    });

    res.json(patients);

  } catch (error) {
    console.error('Error buscando pacientes:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

// Obtener estadísticas generales del sistema
router.get('/system-stats', async (req, res) => {
  try {
    const totalPatients = await prisma.pacient.count();
    const totalVitals = await prisma.signosVitales.count();
    const totalSessions = await prisma.session.count();
    const totalDevices = await prisma.device.count();

    // Obtener el último registro de signos vitales
    const lastVital = await prisma.signosVitales.findFirst({
      orderBy: { createdAt: 'desc' }
    });

    // Calcular promedio general de frecuencia cardíaca
    const avgHeartRate = await prisma.signosVitales.aggregate({
      _avg: { heartRate: true }
    });

    const stats = {
      success: true,
      data: {
        totalPatients,
        totalVitals,
        totalSessions,
        totalDevices,
        averageHeartRate: Math.round(avgHeartRate._avg.heartRate || 0),
        lastUpdate: lastVital?.createdAt || null,
        systemStatus: 'active'
      }
    };

    res.json(stats);

  } catch (error) {
    console.error('Error obteniendo estadísticas del sistema:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

// Registrar análisis del chat
router.post('/chat-analysis', async (req, res) => {
  try {
    const { patientId, analysis, source = 'chat-pulso' } = req.body;

    // Crear registro de análisis
    const chatAnalysis = await prisma.chatAnalysis.create({
      data: {
        patientId: patientId ? parseInt(patientId) : null,
        analysis: JSON.stringify(analysis),
        source,
        timestamp: new Date()
      }
    });

    res.status(201).json({
      success: true,
      data: chatAnalysis
    });

  } catch (error) {
    console.error('Error registrando análisis del chat:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

// Obtener historial de análisis del chat
router.get('/chat-history/:patientId?', async (req, res) => {
  try {
    const { patientId } = req.params;
    const limit = parseInt(req.query.limit) || 50;

    const where = patientId ? { patientId: parseInt(patientId) } : {};

    const history = await prisma.chatAnalysis.findMany({
      where,
      orderBy: { timestamp: 'desc' },
      take: limit
    });

    res.json({
      success: true,
      data: history.map(h => ({
        ...h,
        analysis: JSON.parse(h.analysis)
      }))
    });

  } catch (error) {
    console.error('Error obteniendo historial del chat:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

// WebSocket endpoint para datos en tiempo real
router.get('/realtime/:patientId', async (req, res) => {
  try {
    const { patientId } = req.params;
    
    // Verificar que el paciente existe
    const patient = await prisma.pacient.findUnique({
      where: { id: parseInt(patientId) }
    });

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: 'Paciente no encontrado'
      });
    }

    // Obtener los últimos datos en tiempo real
    const latestVitals = await prisma.signosVitales.findMany({
      where: { patientId: parseInt(patientId) },
      orderBy: { createdAt: 'desc' },
      take: 1
    });

    res.json({
      success: true,
      data: {
        patient,
        latestVital: latestVitals[0] || null,
        timestamp: new Date()
      }
    });

  } catch (error) {
    console.error('Error obteniendo datos en tiempo real:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

export default router; 