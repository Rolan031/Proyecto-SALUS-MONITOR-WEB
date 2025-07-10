export class CreateDevice {
  constructor(deviceRepository, patientRepository) {
    this.deviceRepo = deviceRepository;
    this.patientRepo = patientRepository;
  }

  async execute(deviceData) {
    // Validar que el paciente existe
    const patient = await this.patientRepo.findById(deviceData.patientId);
    if (!patient) {
      throw new Error('Paciente no encontrado');
    }

    // Validar que el deviceId sea único
    const existingDevice = await this.deviceRepo.findByDeviceId(deviceData.deviceId);
    if (existingDevice) {
      throw new Error('El dispositivo ya está registrado');
    }

    // Crear el dispositivo
    const device = await this.deviceRepo.create(deviceData);
    return device;
  }
} 