import express from 'express';
import {
    createAppointment,
    getMyAppointments,
    updateAppointmentStatus
} from '../controllers/appointmentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect); // All routes require authentication

router.route('/')
    .post(createAppointment);

router.route('/my-appointments')
    .get(getMyAppointments);

router.route('/:id/status')
    .put(updateAppointmentStatus);

export default router;
