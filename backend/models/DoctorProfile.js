import mongoose from 'mongoose';

const doctorProfileSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    specialty: { type: String, default: '' },
    title: { type: String, default: '' },
    location: { type: String, default: '' },
    city: { type: String, default: '' },
    experience: { type: String, default: '' },
    about: { type: String, default: '' },
    rating: { type: Number, default: 0 },
    reviewsCount: { type: Number, default: 0 },
    patientsCount: { type: Number, default: 0 },
    appointmentsBooked: { type: String, default: '0' },
    awardsCount: { type: String, default: '0' },
    priceRange: { type: String, default: '' },
    acceptingPatients: { type: Boolean, default: true },
    experienceList: { type: Array, default: [] },
    insurances: { type: Array, default: [] },
    specialties: { type: Array, default: [] },
    services: { type: Array, default: [] },
    availability: { type: Array, default: [] },
    clinics: { type: Array, default: [] }, // Or references to Facility
    memberships: { type: Array, default: [] },
    awards: { type: Array, default: [] },
    businessHours: { type: Array, default: [] },
    documents: { type: Array, default: [] }, // Array of file sizes/URLs for verification
    approvedDate: { type: Date }
}, { timestamps: true });

const DoctorProfile = mongoose.model('DoctorProfile', doctorProfileSchema);
export default DoctorProfile;
