import express from 'express';
import { createFacility, getMyFacility } from '../controllers/facilityController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();


router.route('/').post(protect, createFacility);
router.route('/my-facility').get(protect, getMyFacility);

export default router;
