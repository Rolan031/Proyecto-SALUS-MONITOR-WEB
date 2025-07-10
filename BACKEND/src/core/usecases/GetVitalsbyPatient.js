export class GetVitalsByPatient {
  constructor(vitalSignRepository) {
    this.vitalSignRepo = vitalSignRepository;
  }

  async execute(patientId) {
    if (!patientId) {
      throw new Error("Patient ID is required");
    }

    const vitals = await this.vitalSignRepo.findByPatientId(patientId);
    if (!vitals || vitals.length === 0) {
      throw new Error(`No vital signs found for patient ID ${patientId}`);
    }

    return vitals;
  }
}
