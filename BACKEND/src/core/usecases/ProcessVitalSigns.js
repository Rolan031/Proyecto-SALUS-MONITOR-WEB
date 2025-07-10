//ProcessVitalSigns.js
export class ProcessVitalSigns {
  constructor(vitalSignRepository, sessionRepository) {
    this.vitalSignRepo = vitalSignRepository;
    this.sessionRepo = sessionRepository;
  }

  async execute(data) {
    // Validar datos del sensor
    this.validateSensorData(data);

    // Registrar signos vitales
    const vitalSign = await this.vitalSignRepo.create({
      patientId: data.patientId,
      sessionId: data.sessionId,
      heartRate: data.heartRate,
      source: data.source
    });

    return vitalSign;
  }

  validateSensorData(data) {
    const errors = [];

    if (!data.heartRate || data.heartRate < 30 || data.heartRate > 200) {
      errors.push('Frecuencia cardíaca inválida');
    }

    if (errors.length > 0) {
      throw new Error(`Datos del sensor inválidos: ${errors.join(', ')}`);
    }
  }
}