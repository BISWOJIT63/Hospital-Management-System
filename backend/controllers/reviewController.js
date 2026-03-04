import Review from '../models/Review.js';
import Facility from '../models/Facility.js';

// @desc    Get all reviews for a specific facility
// @route   GET /api/reviews/facility/:facilityId
// @access  Public
export const getFacilityReviews = async (req, res) => {
    try {
        const reviews = await Review.find({ facilityId: req.params.facilityId }).sort({ createdAt: -1 });
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Add a new review to a facility
// @route   POST /api/reviews
// @access  Public (or could be Patient-only later)
export const addReview = async (req, res) => {
    try {
        const { facilityId, name, dept, rating, text, date, avatar } = req.body;

        // Verify facility exists
        const facility = await Facility.findById(facilityId);
        if (!facility) {
            return res.status(404).json({ message: 'Facility not found' });
        }

        const review = await Review.create({
            facilityId,
            name,
            dept,
            rating,
            text,
            date: date || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            avatar: avatar || name.substring(0, 2).toUpperCase(),
        });

        // Optionally update the facility's overall rating and review count
        const allReviews = await Review.find({ facilityId });
        const avgRating = (allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length).toFixed(1);

        facility.rating = avgRating;
        facility.reviewsCount = allReviews.length.toString();
        await facility.save();

        res.status(201).json(review);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Reply to a review (Admin only)
// @route   PUT /api/reviews/:id/reply
// @access  Private (Admin)
export const replyToReview = async (req, res) => {
    try {
        const { reply } = req.body;
        const review = await Review.findById(req.params.id);

        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        // Make sure the admin making the reply owns the facility the review is for
        const facility = await Facility.findById(review.facilityId);
        if (facility.adminId.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized to reply to this review' });
        }

        review.reply = reply;
        const updatedReview = await review.save();

        res.json(updatedReview);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Delete a review (Admin only)
// @route   DELETE /api/reviews/:id
// @access  Private (Admin)
export const deleteReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);

        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        // Ensure ownership
        const facility = await Facility.findById(review.facilityId);
        if (facility.adminId.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized to delete this review' });
        }

        await review.deleteOne();

        // Update facility stats
        const allReviews = await Review.find({ facilityId: review.facilityId });
        if (allReviews.length > 0) {
            facility.rating = (allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length).toFixed(1);
        } else {
            facility.rating = "0.0";
        }
        facility.reviewsCount = allReviews.length.toString();
        await facility.save();

        res.json({ message: 'Review removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
