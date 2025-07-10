export class Session {
  constructor({
    id,
    patientId,
    startTime = new Date(),
    endTime = null,
    notes = "",
    vitalSigns = []
  }) {
    this.id = id;
    this.patientId = patientId;
    this.startTime = startTime;
    this.endTime = endTime;
    this.notes = notes;
    this.vitalSigns = vitalSigns;

    this.validate();
  }

  validate() {
    if (!this.patientId) throw new Error("Patient ID is required");
    if (this.endTime && this.endTime < this.startTime) {
      throw new Error("End time cannot be before start time");
    }
  }

  addVitalSign(vitalSign) {
    this.vitalSigns.push(vitalSign);
  }

  closeSession(notes = "") {
    this.endTime = new Date();
    this.notes = notes;
  }

  toJSON() {
    return {
      id: this.id,
      patientId: this.patientId,
      startTime: this.startTime,
      endTime: this.endTime,
      notes: this.notes,
      duration: this.endTime 
        ? Math.round((this.endTime - this.startTime) / 1000) 
        : null
    };
  }
}