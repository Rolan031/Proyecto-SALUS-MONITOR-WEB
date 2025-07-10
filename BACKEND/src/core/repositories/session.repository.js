export class ISessionRepository {
  async create(sessionData) {
    throw new Error("Not implemented");
  }

  async findById(id) {
    throw new Error("Not implemented");
  }

  async findByPatientId(patientId) {
    throw new Error("Not implemented");
  }

  async update(id, updates) {
    throw new Error("Not implemented");
  }

  async addVitalSign(sessionId, vitalSignData) {
    throw new Error("Not implemented");
  }
}