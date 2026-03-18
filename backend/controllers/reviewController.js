import Review from '../models/Review.js';
import Hospital from '../models/Hospital.js';
import Clinic from '../models/Clinic.js';
import Doctor from '../models/Doctor.js';
import Service from '../models/Service.js';

export const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find()
            .populate('authorId', 'name avatar')
            .sort({ createdAt: -1 });
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const getFacilityReviews = async (req, res) => {
    try {
        const reviews = await Review.find({ entityId: req.params.facilityId, entityType: { $in: ['Facility', 'Hospital', 'Clinic'] } }).populate('authorId', 'name avatar').sort({ createdAt: -1 });
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const getDoctorReviews = async (req, res) => {
    try {
        const reviews = await Review.find({ entityId: req.params.doctorId }).populate('authorId', 'name avatar').sort({ createdAt: -1 });
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const getServiceReviews = async (req, res) => {
    try {
        const reviews = await Review.find({ entityId: req.params.serviceId, entityType: 'Service' }).populate('authorId', 'name avatar').sort({ createdAt: -1 });
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const addReview = async (req, res) => {
    try {
        const { facilityId, doctorId, serviceId, rating, text } = req.body;

        const entityId = facilityId || doctorId || serviceId;
        let entityType = 'Doctor';
        if (facilityId) {
            const hosp = await Hospital.findById(facilityId);
            entityType = hosp ? 'Hospital' : 'Clinic';
        }
        if (serviceId) entityType = 'Service';

        if (!entityId) {
            return res.status(400).json({ message: 'Must provide facilityId, doctorId, or serviceId' });
        }

        const review = await Review.create({
            authorId: req.user._id,
            entityId,
            entityType,
            rating,
            text
        });

        const allReviews = await Review.find({ entityId });
        const avgRating = (allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length).toFixed(1);

        if (entityType === 'Hospital') {
            await Hospital.findByIdAndUpdate(entityId, { rating: avgRating, reviewsCount: allReviews.length });
        } else if (entityType === 'Clinic') {
            await Clinic.findByIdAndUpdate(entityId, { rating: avgRating, reviewsCount: allReviews.length });
        } else if (entityType === 'Doctor') {
            await Doctor.findByIdAndUpdate(entityId, { rating: avgRating, reviewsCount: allReviews.length });
        } else if (entityType === 'Service') {
            await Service.findByIdAndUpdate(entityId, { 
                'rating.average': avgRating, 
                'rating.count': allReviews.length 
            });
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

        if (req.user.role !== 'SuperAdmin' && review.authorId?.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized to delete this review' });
        }

        const entityId = review.entityId;
        const entityType = review.entityType;

        await review.deleteOne();

        const allReviews = await Review.find({ entityId });
        const avgRating = allReviews.length > 0 ? (allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length).toFixed(1) : 0;

        if (entityType === 'Hospital') {
            await Hospital.findByIdAndUpdate(entityId, { rating: avgRating, reviewsCount: allReviews.length });
        } else if (entityType === 'Clinic') {
            await Clinic.findByIdAndUpdate(entityId, { rating: avgRating, reviewsCount: allReviews.length });
        } else if (entityType === 'Doctor') {
            await Doctor.findByIdAndUpdate(entityId, { rating: avgRating, reviewsCount: allReviews.length });
        } else if (entityType === 'Service') {
            await Service.findByIdAndUpdate(entityId, { 
                'rating.average': avgRating, 
                'rating.count': allReviews.length 
            });
        }

        res.json({ message: 'Review removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
