//Prisma.signos.repository.js
import { IVitalSignRepository } from "../../core/repositories/signos.repository.js";
import { VitalSign } from "../../core/entities/signosvitales.js";
import { prisma } from "./prismaClient.js";

export class PrismaVitalSignRepository extends IVitalSignRepository {
  async create(vitalSignData) {
    try {
      const created = await prisma.signosVitales.create({
        data: {
          patientId: vitalSignData.patientId,
          heartRate: vitalSignData.heartRate,
          notes: vitalSignData.notes || "",
          source: vitalSignData.source || "manual"
        },
        include: { patient: true }
      });

      return new VitalSign({
        ...created,
        patient: created.patient
      });
    } catch (error) {
      console.error("Error creating vital sign:", error);
      throw new Error("Failed to create vital sign record");
    }
  }

  async findByPatientId(patientId, options = {}) {
    const { limit = 100, orderBy = 'desc' } = options;
    try {
      const records = await prisma.signosVitales.findMany({
        where: { patientId },
        take: limit,
        orderBy: { timestamp: orderBy },
        include: { patient: { select: { nombre: true } } }
      });

      return records.map(r => new VitalSign(r));
    } catch (error) {
      console.error("Error finding vital signs:", error);
      throw new Error("Failed to retrieve vital signs");
    }
  }

  async getLatest(patientId) {
    try {
      const record = await prisma.signosVitales.findFirst({
        where: { patientId },
        orderBy: { timestamp: 'desc' },
        include: { patient: { select: { nombre: true } } }
      });

      return record ? new VitalSign(record) : null;
    } catch (error) {
      console.error("Error getting latest vital sign:", error);
      throw new Error("Failed to retrieve latest vital sign");
    }
  }

  async getStatistics(patientId) {
    try {
      const [latest, avg] = await Promise.all([
        this.getLatest(patientId),
        prisma.signosVitales.aggregate({
          where: { patientId },
          _avg: {
            heartRate: true
          }
        })
      ]);

      return {
        latest,
        averages: avg._avg
      };
    } catch (error) {
      console.error("Error getting statistics:", error);
      throw new Error("Failed to calculate statistics");
    }
  }
}

// Export the PrismaVitalSignRepository as the default export
export default PrismaVitalSignRepository; 