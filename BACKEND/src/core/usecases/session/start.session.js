export class StartSession {
  constructor(sessionRepository, patientRepository) {
    this.sessionRepo = sessionRepository;
    this.patientRepo = patientRepository;
  }

  async execute(patientId) {
    const patient = await this.patientRepo.findById(patientId);
    if (!patient) throw new Error("Patient not found");

    const activeSession = await this.sessionRepo.findActiveSession(patientId);
    if (activeSession) throw new Error("Patient already has an active session");

    return this.sessionRepo.create({ patientId });
  }
}