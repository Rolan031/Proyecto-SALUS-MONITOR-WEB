import { CreatePatient } from "../../core/usecases/create.patient.js";
import { PrismaPatientRepository } from "../../infrastructure/db/PrismaPatientRepository.js";

export class PatientService {
  constructor() {
    this.repository = new PrismaPatientRepository();
  }

  async registerPatient(patientData) {
    const useCase = new CreatePatient(this.repository);
    return useCase.execute(patientData);
  }
}