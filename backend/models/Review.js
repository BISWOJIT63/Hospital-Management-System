import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    entityId: { type: mongoose.Schema.Types.ObjectId, refPath: 'entityType', required: true }, // Doctor ID or Facility ID
    entityType: { type: String, enum: ['Doctor', 'Hospital', 'Clinic', 'Facility', 'Service'], required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    text: { type: String, required: true },
    isFlagged: { type: Boolean, default: false },
    reply: {
        text: String,
        createdAt: Date,
        repliedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' }
    }
}, { timestamps: true });

const Review = mongoose.model('Review', reviewSchema);
export default Review;
