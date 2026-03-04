import express from 'express';
import { createFacility, getMyFacility } from '../controllers/facilityController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Both routes require the user to be logged in
router.route('/').post(protect, createFacility);
router.route('/my-facility').get(protect, getMyFacility);

export default router;
