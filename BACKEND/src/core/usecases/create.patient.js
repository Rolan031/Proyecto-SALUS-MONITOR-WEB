import { Pacient } from "../entities/pacient.js";

export class CreatePatient {
  constructor(pacientRepository) {
    this.repository = pacientRepository;
  }

  async execute(patientData) {
    const pacient = new Pacient(patientData);
    pacient.validate();
    return this.repository.create(pacient);
  }
}
