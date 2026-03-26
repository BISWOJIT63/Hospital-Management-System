import mongoose from 'mongoose';

const hospitalSchema = new mongoose.Schema({
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: true },
    name: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    description: { type: String, required: true },
    about: { type: String, required: true },
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
    type: { type: String, default: 'Hospital' },
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
        image: { type: String },
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
    doctors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' }],
    documents: { type: Array, default: [] },
    features: { type: Array, default: [] },
    images: { type: Array, default: [] },
    appointmentTypes: [{
        name: { type: String, required: true },
        price: { type: Number, required: true }
    }]
}, { timestamps: true });

hospitalSchema.index({ status: 1, approvedDate: -1 });
hospitalSchema.index({ createdAt: -1 });

const Hospital = mongoose.model('Hospital', hospitalSchema);

export default Hospital;
