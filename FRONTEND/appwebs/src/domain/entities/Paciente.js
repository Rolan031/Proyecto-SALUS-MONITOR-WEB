export class Patient {
  constructor({ id, nombre, edad, genero, fechaRegistro }) {
    this.id = id;
    this.nombre = nombre;
    this.edad = edad;
    this.genero = genero;
    this.fechaRegistro = fechaRegistro || new Date();
  }

  validate() {
    const errors = {};
    if (!this.nombre?.trim()) errors.nombre = 'Name is required';
    if (!this.edad || this.edad < 1 || this.edad > 150) {
      errors.edad = 'Age must be between 1 and 125 years';
    }
    if (!this.genero) errors.genero = 'Gender is required';
    return errors;
  }
}