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

router.route('/').get(getHospitals);
router.route('/:id').get(getHospitalById);
router.route('/all/departments').get(getDepartments);
router.route('/all/facilities').get(getFacilities);
router.route('/all/reviews').get(getReviews);
router.route('/all/awards').get(getAwards);

export default router;
