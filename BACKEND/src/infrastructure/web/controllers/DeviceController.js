export class DeviceController {
  constructor(createDeviceUseCase) {
    this.createDeviceUseCase = createDeviceUseCase; 
  }

  async createDevice(req, res) {
    try {
      const device = await this.createDeviceUseCase.execute(req.body); 
      res.status(201).json({
        message: 'Dispositivo creado correctamente',
        data: device
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}
