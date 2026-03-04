import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    facilityId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Facility',
        required: true
    },
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: false // Optional if we allow anonymous/unregistered reviews later
    },
    name: { type: String, required: true },
    avatar: { type: String, default: 'US' }, // Fallback initials
    dept: { type: String, required: true }, // Which department/specialty the visit was for
    rating: { type: Number, required: true, min: 1, max: 5 },
    text: { type: String, required: true },
    date: { type: String }, // e.g., '2 days ago' or 'Oct 12'
    reply: { type: String } // For admin responses
}, { timestamps: true });

const Review = mongoose.model('Review', reviewSchema);
export default Review;
