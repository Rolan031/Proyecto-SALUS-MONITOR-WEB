import express from 'express';
import { SessionController } from '../controllers/SessionController.js';
import { StartSession } from '../../../core/usecases/session/start.session.js';
import { EndSession } from '../../../core/usecases/session/end.session.js';
import { GetSession } from '../../../core/usecases/session/get.session.js';
import { PrismaSessionRepository } from '../../db/Prisma.session.repository.js';
import { PrismaPatientRepository } from '../../db/PrismaPatientRepository.js';

const router = express.Router();

const sessionRepo = new PrismaSessionRepository();
const patientRepo = new PrismaPatientRepository();

const controller = new SessionController(
  new StartSession(sessionRepo, patientRepo),
  new EndSession(sessionRepo),
  new GetSession(sessionRepo)
);

router.post('/:patientId/sessions', controller.start.bind(controller));
router.put('/sessions/:sessionId/end', controller.end.bind(controller));
router.get('/sessions/:sessionId', controller.get.bind(controller));


export default router;
