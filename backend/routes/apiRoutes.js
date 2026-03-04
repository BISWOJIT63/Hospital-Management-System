import express from 'express';
import {
    getDoctors,
    getDoctorById,
    createDoctor,
    getMyAppointments,
    createAppointment,
} from '../controllers/doctorAppointmentController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import { seedDatabase } from '../controllers/seedController.js';

const router = express.Router();

// Doctor routes
router.route('/doctors').get(getDoctors).post(protect, admin, createDoctor);
router.route('/doctors/:id').get(getDoctorById);

// Appointment routes
router.route('/appointments').post(protect, createAppointment);
router.route('/appointments/myappointments').get(protect, getMyAppointments);

// Seed route
router.post('/seed', seedDatabase);

export default router;
