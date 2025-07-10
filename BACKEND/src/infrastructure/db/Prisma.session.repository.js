import { ISessionRepository } from "../../core/repositories/session.repository.js";
import { Session } from "../../core/entities/session.js";
import { prisma } from "./prismaClient.js";

export class PrismaSessionRepository extends ISessionRepository {
  async create(sessionData) {
    const created = await prisma.session.create({
      data: {
        patientId: sessionData.patientId,
        notes: sessionData.notes || ""
      },
      include: { vitalSigns: true }
    });
    return new Session(created);
  }

  async findById(id) {
    const session = await prisma.session.findUnique({
      where: { id },
      include: { vitalSigns: true, patient: true }
    });
    return session ? new Session(session) : null;
  }

  async findByPatientId(patientId) {
    const sessions = await prisma.session.findMany({
      where: { patientId },
      orderBy: { startTime: 'desc' },
      include: { vitalSigns: { orderBy: { timestamp: 'desc' } } }
    });
    return sessions.map(s => new Session(s));
  }

  async findActiveSession(patientId) {
    const activeSession = await prisma.session.findFirst({
      where: { 
        patientId,
        endTime: null
      },
      include: { vitalSigns: true, patient: true }
    });
    return activeSession ? new Session(activeSession) : null;
  }

  async update(id, updates) {
    const updated = await prisma.session.update({
      where: { id },
      data: {
        endTime: updates.endTime,
        notes: updates.notes
      },
      include: { vitalSigns: true }
    });
    return new Session(updated);
  }

  async addVitalSign(sessionId, vitalSignData) {
    const [session, vitalSign] = await prisma.$transaction([
      prisma.session.update({
        where: { id: sessionId }
      }),
      prisma.signosVitales.create({
        data: {
          ...vitalSignData,
          sessionId: sessionId
        }
      })
    ]);

    return {
      session: new Session(session),
      vitalSign
    };
  }
}