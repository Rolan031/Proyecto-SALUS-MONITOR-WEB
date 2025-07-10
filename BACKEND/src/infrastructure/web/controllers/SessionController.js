export class SessionController {
  constructor(
    startSessionUseCase,
    endSessionUseCase,
    getSessionUseCase
  ) {
    this.startSession = startSessionUseCase;
    this.endSession = endSessionUseCase;
    this.getSession = getSessionUseCase;
  }

  async start(req, res) {
    try {
      const session = await this.startSession.execute(req.params.patientId);
      res.status(201).json(session);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async end(req, res) {
    try {
      const session = await this.endSession.execute(
        req.params.sessionId,
        req.body.notes
      );
      res.json(session);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async get(req, res) {
    try {
      const session = await this.getSession.execute(req.params.sessionId);
      res.json(session);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
}