//RecordSensorVitalSigns.js
import { SignosVitales } from '../entities/signosvitales.js';

export class RecordSensorVitalSigns {
  constructor(vitalSignRepository, patientRepository) {
    this.vitalSignRepo = vitalSignRepository;
    this.patientRepo = patientRepository;
  }

  async execute(sensorData) {
    // Validar formato de datos del ESP32
    if (!sensorData.deviceId || !sensorData.patientId) {
      throw new Error("Datos del sensor incompletos");
    }

    // Verificar que el paciente existe
    const patient = await this.patientRepo.findById(sensorData.patientId);
    if (!patient) throw new Error("Paciente no registrado");

    // Mapear datos del sensor a formato estándar
    const vitalSignData = {
      patientId: sensorData.patientId,
      heartRate: sensorData.hr,
      source: "sensor",
      deviceId: sensorData.deviceId,
      notes: `Dispositivo: ${sensorData.deviceId}`
    };

    const vitalSign = new SignosVitales(vitalSignData);
    return this.vitalSignRepo.create(vitalSign);
  }
}