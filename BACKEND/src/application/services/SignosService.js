export class VitalSignService {
  constructor(repository) {
    this.repository = repository;
  }

  async getPatientVitals(patientId) {
    const [vitals, stats] = await Promise.all([
      this.repository.findByPatientId(patientId),
      this.repository.getStatistics(patientId)
    ]);

    return {
      history: vitals,
      latest: stats.latest,
      averages: stats.averages
    };
  }

  async createManualReading(patientId, data) {
    return this.repository.create({
      ...data,
      patientId,
      source: "manual"
    });
  }
}