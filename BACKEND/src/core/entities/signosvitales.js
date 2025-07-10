//signosvitales.js
export class SignosVitales {
  constructor({
    id = null,
    patientId,
    sessionId = null,
    timestamp = new Date(),
    heartRate = null,
    notes = "",
    source = "manual",
    deviceId = null,
    patient = null
  }) {
    this.id = id;
    this.patientId = patientId;
    this.sessionId = sessionId;
    this.timestamp = timestamp;
    this.heartRate = heartRate;
    this.notes = notes;
    this.source = source;
    this.deviceId = deviceId;
    this.patient = patient;
    this.validate();
  }

  validate() {
    const errors = [];
    if (!this.patientId) {
      errors.push("Se requiere ID de paciente");
    }

    if (this.heartRate && (this.heartRate < 30 || this.heartRate > 200)) {
      errors.push("Frecuencia cardíaca debe estar entre 30 y 200 bpm");
    }

    if (errors.length > 0) {
      throw new Error(`Datos inválidos: ${errors.join(", ")}`);
    }
  }

  // Métodos de negocio
  isCritical() {
    return (
      (this.heartRate && (this.heartRate < 50 || this.heartRate > 120))
    );
  }

  // Métodos de transformación
  toPrismaData() {
    return {
      patientId: this.patientId,
      sessionId: this.sessionId,
      heartRate: this.heartRate,
      notes: this.notes,
      source: this.source,
      deviceId: this.deviceId,
      timestamp: this.timestamp
    };
  }

  toJSON() {
    return {
      id: this.id,
      patientId: this.patientId,
      sessionId: this.sessionId,
      timestamp: this.timestamp.toISOString(),
      heartRate: this.heartRate,
      isCritical: this.isCritical(),
      source: this.source,
      deviceId: this.deviceId,
      notes: this.notes,
      patient: this.patient ? {
        id: this.patient.id,
        nombre: this.patient.nombre
      } : null
    };
  }

  // Factory methods
  static fromPrisma(prismaData) {
    return new SignosVitales({
      ...prismaData,
      patient: prismaData.patient
    });
  }

  static fromSensorData(sensorData) {
    return new SignosVitales({
      patientId: sensorData.patientId,
      sessionId: sensorData.sessionId,
      heartRate: sensorData.heartRate,
      source: 'sensor',
      deviceId: sensorData.deviceId,
      notes: `Registro automático - Dispositivo: ${sensorData.deviceId || 'N/A'}`
    });
  }
}