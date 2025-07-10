export class PatientRegistration {
  constructor(apiClient) {
    this.api = apiClient;
  }

  async execute(patientData) {
    try {
      const response = await this.api.post('/patients', patientData);
      return response;
    } catch (error) {
      if (error.message.includes('unique constraint')) {
        throw new Error('Patient is already registered');
      }
      throw error;
    }
  }
}