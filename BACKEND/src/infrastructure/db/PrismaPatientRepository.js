import { IPatientRepository } from "../../core/repositories/paciente.repository.js";
import { Pacient } from "../../core/entities/pacient.js";
import { prisma } from "./prismaClient.js";

export class PrismaPatientRepository extends IPatientRepository {
  async create(patient) {
    try {
      console.log('Creando paciente con datos:', {
        nombre: patient.nombre,
        edad: patient.edad,
        genero: patient.genero
      });
      
      const created = await prisma.pacient.create({
        data: {
          nombre: patient.nombre,
          edad: patient.edad,
          genero: patient.genero
        }
      });
      
      console.log('Paciente creado exitosamente:', created);
      return new Pacient(created);
    } catch (error) {
      console.error('Error creating patient:', error);
      if (error.code === 'P2002') {
        throw new Error('Ya existe un paciente con estos datos');
      }
      throw new Error(`Error al crear paciente: ${error.message}`);
    }
  }

  async findAll() {
    const patients = await prisma.pacient.findMany();
    return patients.map(p => new Pacient(p));
  }

  async findById(id) {
    const found = await prisma.pacient.findUnique({
      where: { id }
    });
    return found ? new Pacient(found) : null;
  }

  async update(patient) {
    const updated = await prisma.pacient.update({
      where: { id: patient.id },
      data: {
        nombre: patient.nombre,
        edad: patient.edad,
        genero: patient.genero
      }
    });
    return new Pacient(updated);
  }

  async delete(id) {
    await prisma.pacient.delete({ where: { id } });
  }
}
