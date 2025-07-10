// vitals.routes.js
import express from 'express';
import { VitalSignController } from '../controllers/signosController.js';
import { RecordSensorVitalSigns } from '../../../core/usecases/RecordSensorVitalSigns.js';
import { GetVitalsByPatient } from '../../../core/usecases/GetVitalsByPatient.js';
import { PrismaVitalSignRepository } from '../../db/VitalSignRepository.js';
import { PrismaPatientRepository } from '../../db/PrismaPatientRepository.js';

const router = express.Router();

const vitalRepo = new PrismaVitalSignRepository();
const patientRepo = new PrismaPatientRepository();

const controller = new VitalSignController(
  null,
  new RecordSensorVitalSigns(vitalRepo, patientRepo),
  new GetVitalsByPatient(vitalRepo)
);

// Ruta para registrar signos vitales desde sensor
router.post('/sensor', async (req, res) => {
  try {
    await controller.recordFromSensor(req.body);
    res.status(201).json({ message: 'Registrado' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Ruta para obtener los signos vitales de un paciente
router.get('/patient/:patientId', controller.getByPatient.bind(controller));

// Ruta para guardar signos vitales manualmente
router.post('/manual', async (req, res) => {
  try {
    const result = await controller.recordManual(req.body);
    res.status(201).json({ 
      message: 'Signos vitales guardados correctamente',
      data: result 
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
