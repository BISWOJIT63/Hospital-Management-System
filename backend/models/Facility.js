import mongoose from 'mongoose';

const facilitySchema = new mongoose.Schema({
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
        required: true,
        unique: true
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },

    // Basic Info
    name: { type: String, required: true },
    type: { type: String, enum: ['hospital', 'clinic'], required: true },
    accreditation: String,
    location: { type: String, required: true },
    established: String,
    priceRange: String,
    beds: String,
    doctors: String,
    surgeries: String,
    rating: String,
    reviewsCount: String,
    about: { type: String, required: true },
    acceptingPatients: { type: mongoose.Schema.Types.Mixed }, // true, false, or "contact"
    accreditationsList: String,
    images: [{ type: String }],

    // Arrays
    departments: [{
        name: String,
        head: String,
        specialties: String,
        description: String
    }],
    insurances: [{ type: String }],
    facilities: [{ type: String }],
    services: [{
        name: String,
        price: String
    }],
    keyDoctors: [{
        name: String,
        specialty: String,
        experience: String,
        availability: String
    }],
    awards: [{
        title: String,
        year: String,
        desc: String
    }],
    businessHours: [{
        day: String,
        time: String,
        isOpen: Boolean,
        highlight: Boolean
    }]
}, { timestamps: true });

const Facility = mongoose.model('Facility', facilitySchema);
export default Facility;
