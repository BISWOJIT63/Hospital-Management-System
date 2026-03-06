import mongoose from 'mongoose';

const facilitySchema = new mongoose.Schema({
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    type: { type: String, enum: ['Hospital', 'Clinic'], required: true },
    city: { type: String, required: true },
    address: { type: String, default: "" },
    phone: { type: String, default: "" },
    email: { type: String, default: "" },
    description: { type: String, default: "" },
    about: { type: String, default: "" }, // From baseTemplate
    accreditation: { type: String, default: "" },
    accreditationsList: { type: String, default: "" },
    established: { type: String, default: "" },
    beds: { type: String, default: "" },
    doctorsCount: { type: String, default: "" },
    surgeries: { type: String, default: "" },
    priceRange: { type: String, default: "" },
    rating: { type: Number, default: 0 },
    reviewsCount: { type: Number, default: 0 },
    patientsCount: { type: Number, default: 0 },
    acceptingPatients: { type: mongoose.Schema.Types.Mixed, default: null },
    status: { type: String, enum: ['pending', 'active', 'on-hold', 'rejected', 'approved'], default: 'pending' },
    approvedDate: { type: Date },
    departments: [{
        name: String,
        description: String,
        icon: String
    }],
    keyDoctors: [{
        name: String,
        specialty: String,
        experience: String,
        availability: String,
        patients: { type: String, default: "0" }
    }],
    awards: [{
        title: String,
        year: String,
        desc: String
    }],
    businessHours: { type: Array, default: [] },
    insurances: { type: Array, default: [] },
    facilities: { type: Array, default: [] },
    doctors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'DoctorProfile' }],
    documents: { type: Array, default: [] },
    features: { type: Array, default: [] },
    images: { type: Array, default: [] }
}, { timestamps: true });

const Facility = mongoose.model('Facility', facilitySchema);
export default Facility;
