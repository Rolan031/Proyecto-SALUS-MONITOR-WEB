import { PrismaClient } from '../db/prismaClient.js';

export class PrismaDeviceRepository {
  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(deviceData) {
    return this.prisma.device.create({
      data: deviceData,
      include: {
        patient: true
      }
    });
  }

  async findById(id) {
    return this.prisma.device.findUnique({
      where: { id },
      include: {
        patient: true
      }
    });
  }

  async findByDeviceId(deviceId) {
    return this.prisma.device.findUnique({
      where: { deviceId },
      include: {
        patient: true
      }
    });
  }

  async findByPatientId(patientId) {
    return this.prisma.device.findMany({
      where: { patientId },
      include: {
        patient: true
      }
    });
  }

  async update(id, deviceData) {
    return this.prisma.device.update({
      where: { id },
      data: deviceData,
      include: {
        patient: true
      }
    });
  }

  async delete(id) {
    return this.prisma.device.delete({
      where: { id }
    });
  }

  async getAll() {
    return this.prisma.device.findMany({
      include: {
        patient: true
      }
    });
  }
} 