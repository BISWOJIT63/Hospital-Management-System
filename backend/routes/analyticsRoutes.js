import express from 'express';
import { getMyAnalytics, getSuperAdminDashboard } from '../controllers/analyticsController.js';
import { protect, admin, superAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/my-analytics').get(protect, admin, getMyAnalytics);
router.route('/superadmin').get(protect, superAdmin, getSuperAdminDashboard);

export default router;
