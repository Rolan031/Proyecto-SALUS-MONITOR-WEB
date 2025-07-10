export class SessionService {
  constructor(sessionRepository) {
    this.repository = sessionRepository;
  }

  async getPatientSessions(patientId) {
    return this.repository.findByPatientId(patientId);
  }

  async getSessionWithDetails(sessionId) {
    const session = await this.repository.findById(sessionId);
    if (!session) throw new Error("Session not found");

    const stats = await this.repository.getSessionStats(sessionId);
    
    return {
      ...session.toJSON(),
      stats
    };
  }
}