export class EndSession {
  constructor(sessionRepository) {
    this.sessionRepo = sessionRepository;
  }

  async execute(sessionId, notes = "") {
    const session = await this.sessionRepo.findById(sessionId);
    if (!session) throw new Error("Session not found");
    if (session.endTime) throw new Error("Session already closed");

    return this.sessionRepo.update(sessionId, {
      endTime: new Date(),
      notes
    });
  }
}