import mongoose from 'mongoose';

const doctorProfileSchema = new mongoose.Schema({
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
    title: { type: String, default: '' },
    specialty: { type: String, default: '' },
    location: { type: String, default: '' },
    rating: { type: Number, default: 0 },
    reviewsCount: { type: Number, default: 0 },
    experience: { type: String, default: '' },
    appointmentsBooked: { type: String, default: '0' },
    awardsCount: { type: String, default: '0' },
    priceRange: { type: String, default: '' },
    acceptingPatients: { type: Boolean, default: true },
    about: { type: String, default: '' },
    experienceList: { type: Array, default: [] },
    insurances: { type: Array, default: [] },
    specialties: { type: Array, default: [] },
    services: { type: Array, default: [] },
    availability: { type: Array, default: [] },
    clinics: { type: Array, default: [] },
    memberships: { type: Array, default: [] },
    awards: { type: Array, default: [] },
    businessHours: { type: Array, default: [] },
    reviews: { type: Array, default: [] }
}, { timestamps: true });

const DoctorProfile = mongoose.model('DoctorProfile', doctorProfileSchema);
export default DoctorProfile;
