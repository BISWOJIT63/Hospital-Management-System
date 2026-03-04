import express from 'express';
import {
    getHospitals,
    getHospitalById,
    getDepartments,
    getFacilities,
    getReviews,
    getAwards
} from '../controllers/hospitalController.js';

const router = express.Router();

router.route('/hospitals').get(getHospitals);
router.route('/hospitals/:id').get(getHospitalById);
router.route('/departments').get(getDepartments);
router.route('/facilities').get(getFacilities);
router.route('/reviews').get(getReviews);
router.route('/awards').get(getAwards);

export default router;
