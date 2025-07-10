export class VitalSignController {
  constructor(recordSensorUseCase, getVitalsUseCase) {
    this.recordSensor = recordSensorUseCase;
    this.getVitals = getVitalsUseCase;
  }

  // Para registro desde ESP32 (WebSocket o API)
  async recordFromSensor(data, wsClient = null) {
    try {
      const vitalSign = await this.recordSensor.execute(data);
      if (wsClient) {
        wsClient.send(JSON.stringify({
          type: "VITAL_SIGN_ACK",
          payload: { id: vitalSign.id }
        }));
      }
      return vitalSign;
    } catch (error) {
      if (wsClient) {
        wsClient.send(JSON.stringify({
          type: "ERROR",
          payload: { message: error.message }
        }));
      }
      throw error;
    }
  }

  // Para consulta desde interfaz web
  async getByPatient(req, res) {
    try {
      const vitals = await this.getVitals.execute(req.params.patientId, {
        limit: parseInt(req.query.limit) || 100
      });
      res.json(vitals);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Para guardar signos vitales manualmente
  async recordManual(data) {
    try {
      const vitalSign = await this.recordSensor.execute({
        ...data,
        source: "manual",
        deviceId: "web-interface"
      });
      return vitalSign;
    } catch (error) {
      throw error;
    }
  }
}