import Review from '../models/Review.js';
import Facility from '../models/Facility.js';
import DoctorProfile from '../models/DoctorProfile.js';

export const getFacilityReviews = async (req, res) => {
    try {
        const reviews = await Review.find({ entityId: req.params.facilityId }).populate('authorId', 'name avatar').sort({ createdAt: -1 });
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const addReview = async (req, res) => {
    try {
        const { facilityId, doctorId, rating, text } = req.body;

        const entityId = facilityId || doctorId;
        const entityType = facilityId ? 'Facility' : 'Doctor';

        if (!entityId) {
            return res.status(400).json({ message: 'Must provide facilityId or doctorId' });
        }

        const review = await Review.create({
            authorId: req.user._id,
            entityId,
            entityType,
            rating,
            text
        });

        // Recalculate average rating
        const allReviews = await Review.find({ entityId });
        const avgRating = (allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length).toFixed(1);

        if (entityType === 'Facility') {
            await Facility.findByIdAndUpdate(entityId, { rating: avgRating, reviewsCount: allReviews.length });
        } else {
            await DoctorProfile.findOneAndUpdate({ userId: entityId }, { rating: avgRating, reviewsCount: allReviews.length });
        }

        res.status(201).json(review);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const replyToReview = async (req, res) => {
    try {
        const { reply } = req.body;
        const review = await Review.findById(req.params.id);

        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        // Extremely simplified authorization for now: Admin or SuperAdmin
        if (req.user.role !== 'Admin' && req.user.role !== 'SuperAdmin' && req.user.role !== 'Doctor') {
            return res.status(401).json({ message: 'Not authorized to reply to this review' });
        }

        review.reply = {
            text: reply,
            createdAt: new Date(),
            repliedBy: req.user._id
        };
        const updatedReview = await review.save();

        res.json(updatedReview);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const deleteReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);

        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        // Only author or SuperAdmin can delete
        if (review.authorId.toString() !== req.user._id.toString() && req.user.role !== 'SuperAdmin') {
            return res.status(401).json({ message: 'Not authorized to delete this review' });
        }

        const entityId = review.entityId;
        const entityType = review.entityType;

        await review.deleteOne();

        const allReviews = await Review.find({ entityId });
        const avgRating = allReviews.length > 0 ? (allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length).toFixed(1) : 0;

        if (entityType === 'Facility') {
            await Facility.findByIdAndUpdate(entityId, { rating: avgRating, reviewsCount: allReviews.length });
        } else {
            await DoctorProfile.findOneAndUpdate({ userId: entityId }, { rating: avgRating, reviewsCount: allReviews.length });
        }

        res.json({ message: 'Review removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
