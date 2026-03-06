import express from 'express';
import {
    getDoctorProfile,
    submitRegistrationDetails,
    updateDoctorStatus
} from '../controllers/doctorController.js';

import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();


router.route('/profile')
    .get(protect, getDoctorProfile);

router.route('/register-details')
    .post(protect, submitRegistrationDetails);


router.route('/:id/status')
    .put(protect, admin, updateDoctorStatus);

export default router;
