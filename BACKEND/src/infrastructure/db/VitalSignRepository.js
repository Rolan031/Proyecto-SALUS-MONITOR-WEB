import { prisma } from './prismaClient.js';

export class PrismaVitalSignRepository {
  async findByPatientId(patientId) {
    return await prisma.signosVitales.findMany({
      where: { patientId: patientId }, // Usar patientId según tu schema
      orderBy: { timestamp: 'desc' },
      include: { patient: true }
    });
  }

  async create(signoData) {
    return await prisma.signosVitales.create({
      data: {
        patientId: signoData.patientId,
        sessionId: signoData.sessionId || null,
        heartRate: signoData.heartRate,
        informe: signoData.informe || ""
      },
      include: { patient: true }
    });
  }

  async getLatest(patientId) {
    return await prisma.signosVitales.findFirst({
      where: { patientId },
      orderBy: { timestamp: 'desc' },
      include: { patient: true }
    });
  }
}