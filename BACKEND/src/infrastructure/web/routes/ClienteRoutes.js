import express from 'express';
import { CreatePatient } from '../../../core/usecases/create.patient.js';
import { PrismaPatientRepository } from '../../db/PrismaPatientRepository.js';
import { PatientController } from '../controllers/PatientController.js';

const router = express.Router();
const repository = new PrismaPatientRepository();
const createPatient = new CreatePatient(repository);
const controller = new PatientController(createPatient);

router.post('/', controller.handleCreate.bind(controller));
router.get('/', (req, res) => {
  res.json({ mensaje: 'GET funciona correctamente' });
});

export default router;
