//signos.repository.js
import { PrismaClient } from '@prisma/client';
import { SignosVitales } from "../entities/signosvitales.js";

export class SignosVitalesRepository {
  constructor() {
    this.prisma = new PrismaClient();
  }

  async crear(signosData) {
    try {
      const nuevoSigno = await this.prisma.signosVitales.create({
        data: {
          patientId: signosData.patientId,
          sessionId: signosData.sessionId || null,
          heartRate: signosData.heartRate,
          notes: signosData.notes || '',
          source: signosData.source || 'manual',
          deviceId: signosData.deviceId || null
        },
        include: {
          patient: {
            select: {
              nombre: true,
              edad: true,
              genero: true
            }
          },
          session: {
            select: {
              startTime: true
            }
          }
        }
      });

      return new SignosVitales({
        ...nuevoSigno,
        patient: nuevoSigno.patient,
        session: nuevoSigno.session
      });

    } catch (error) {
      console.error('Error al crear signos vitales:', error);
      throw new Error('No se pudo registrar los signos vitales');
    }
  }

  async obtenerPorPaciente(patientId, options = {}) {
    const { limit = 100, page = 1, orderBy = 'desc' } = options;
    const signos = await this.prisma.signosVitales.findMany({
      where: { patientId },
      take: limit,
      skip: (page - 1) * limit,
      orderBy: { timestamp: orderBy },
      include: {
        patient: {
          select: { nombre: true }
        }
      }
    });
    return signos.map(s => new SignosVitales(s));
  }

  async obtenerUltimosPorPaciente(patientId) {
    const signo = await this.prisma.signosVitales.findFirst({
      where: { patientId },
      orderBy: { timestamp: 'desc' },
      include: {
        patient: {
          select: { nombre: true }
        }
      }
    });
    return signo ? new SignosVitales(signo) : null;
  }

  async obtenerEstadisticas(patientId) {
    const [ultimoRegistro, promedios, conteo] = await Promise.all([
      this.obtenerUltimosPorPaciente(patientId),
      this.prisma.signosVitales.aggregate({
        where: { patientId },
        _avg: {
          heartRate: true
        }
      }),
      this.prisma.signosVitales.count({ where: { patientId } })
    ]);

    return {
      ultimoRegistro,
      promedios: promedios._avg,
      totalRegistros: conteo
    };
  }

  async obtenerPorSesion(sessionId) {
    const signos = await this.prisma.signosVitales.findMany({
      where: { sessionId },
      orderBy: { timestamp: 'asc' },
      include: {
        patient: {
          select: { nombre: true }
        }
      }
    });
    return signos.map(s => new SignosVitales(s));
  }

  async obtenerCriticos(umbrales = {}) {
    const { heartRate } = umbrales;
    const condiciones = [];

    if (heartRate) {
      condiciones.push({
        heartRate: { not: null, lt: heartRate.min, gt: heartRate.max }
      });
    }

    const signos = await this.prisma.signosVitales.findMany({
      where: { OR: condiciones },
      orderBy: { timestamp: 'desc' },
      take: 100,
      include: {
        patient: {
          select: { nombre: true, status: true }
        }
      }
    });

    return signos.map(s => new SignosVitales(s));
  }

  async desconectar() {
    await this.prisma.$disconnect();
  }
}