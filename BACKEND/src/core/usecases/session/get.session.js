export class GetSession {
  constructor(sessionRepository) {
    this.sessionRepo = sessionRepository;
  }

  async execute(sessionId) {
    if (!sessionId) {
      throw new Error("Session ID is required");
    }

    const session = await this.sessionRepo.findById(sessionId);
    if (!session) {
      throw new Error(`No session found with ID ${sessionId}`);
    }

    return session;
  }
}
