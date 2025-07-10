export class Pacient {
  constructor({ id, nombre, edad, genero, createdAt }) {
    this.id = id;
    this.nombre = nombre;
    this.edad = edad;
    this.genero = genero;
    this.createdAt = createdAt;
  }

  validate() {
    const errors = [];
    
    if (!this.nombre || this.nombre.trim() === '') {
      errors.push("Nombre es requerido");
    } else if (this.nombre.length < 2) {
      errors.push("Nombre debe tener al menos 2 caracteres");
    }
    
    if (!this.edad) {
      errors.push("Edad es requerida");
    } else if (isNaN(this.edad)) {
      errors.push("Edad debe ser un número");
    } else if (this.edad < 1 || this.edad > 150) {
      errors.push("Edad debe estar entre 1 y 150 años");
    }
    
    if (!this.genero || this.genero.trim() === '') {
      errors.push("Género es requerido");
    }
    
    if (errors.length > 0) {
      throw new Error(`Datos inválidos: ${errors.join(', ')}`);
    }
  }
}