import express from 'express';
import {
    getFacilityReviews,
    getDoctorReviews,
    getServiceReviews,
    getAllReviews,
    addReview,
    replyToReview,
    deleteReview
} from '../controllers/reviewController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/all', getAllReviews);

router.route('/')
    .post(protect, addReview);

router.route('/facility/:facilityId')
    .get(getFacilityReviews);

router.route('/doctor/:doctorId')
    .get(getDoctorReviews);

router.route('/service/:serviceId')
    .get(getServiceReviews);

router.route('/:id/reply')
    .put(protect, admin, replyToReview);

router.route('/:id')
    .delete(protect, admin, deleteReview);

export default router;
