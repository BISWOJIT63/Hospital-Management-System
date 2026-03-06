import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    entityId: { type: mongoose.Schema.Types.ObjectId, required: true }, // DoctorProfile ID or Facility ID
    entityType: { type: String, enum: ['Doctor', 'Facility'], required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    text: { type: String, required: true },
    isFlagged: { type: Boolean, default: false },
    reply: {
        text: String,
        createdAt: Date,
        repliedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    }
}, { timestamps: true });

const Review = mongoose.model('Review', reviewSchema);
export default Review;
