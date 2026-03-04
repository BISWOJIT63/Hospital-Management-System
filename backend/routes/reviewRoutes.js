import express from 'express';
import {
    getFacilityReviews,
    addReview,
    replyToReview,
    deleteReview
} from '../controllers/reviewController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .post(addReview); // Public route so anyone can leave a review

router.route('/facility/:facilityId')
    .get(getFacilityReviews);

// Admin only routes for managing reviews
router.route('/:id/reply')
    .put(protect, admin, replyToReview);

router.route('/:id')
    .delete(protect, admin, deleteReview);

export default router;
