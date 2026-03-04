import express from 'express';
import { getMyAnalytics } from '../controllers/analyticsController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/my-analytics').get(protect, admin, getMyAnalytics);

export default router;
