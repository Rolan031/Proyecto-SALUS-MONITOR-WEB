import express from 'express';
import { DeviceController } from '../controllers/DeviceController.js';
import { CreateDevice } from '../../../core/usecases/CreateDevice.js';
import { PrismaDeviceRepository } from '../../db/PrismaDeviceRepository.js';
import { PrismaPatientRepository } from '../../db/PrismaPatientRepository.js';

const router = express.Router();

const deviceRepo = new PrismaDeviceRepository();
const patientRepo = new PrismaPatientRepository();

const controller = new DeviceController(
  new CreateDevice(deviceRepo, patientRepo)
);

// Ruta para crear un dispositivo
router.post('/', controller.createDevice.bind(controller));

export default router; 