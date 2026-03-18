import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const doctorSchema = new mongoose.Schema({
    // Auth & Identity (from former User)
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: {
        type: String,
        required: function () {
            return !this.googleId && !this.facebookId;
        }
    },
    role: { type: String, default: 'Doctor' },
    avatar: { type: String },
    profilePic: { type: String }, // For consistency with frontend
    image: { type: String }, // For backward compatibility with seed data/social login
    phone: { type: String },
    emergencyEmail: { type: String },
    status: {
        type: String,
        enum: ['pending', 'active', 'rejected', 'on-hold'],
        default: 'active'
    },
    gender: { type: String },
    dob: { type: String },
    address: { type: String },
    googleId: { type: String },
    facebookId: { type: String },
    resetPasswordToken: String,
    resetPasswordExpire: Date,

    // Profile Details (from former DoctorProfile)
    specialty: { type: String },
    category: { type: String, default: '' },
    title: { type: String, default: '' },
    location: { type: String },
    city: { type: String },
    experience: { type: String },
    about: { type: String },
    licenseNo: { type: String }, // From signup form
    department: { type: String }, // From signup form
    consultationFee: { type: Number }, // From signup form
    
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
    treatments: { type: Array, default: [] }, // Explicitly define treatments
    availability: { type: Array, default: [] },
    clinics: { type: Array, default: [] },
    memberships: { type: Array, default: [] },
    awards: { type: Array, default: [] },
    businessHours: { type: Array, default: [] },
    documents: { type: Array, default: [] },
    specialists: { type: Array, default: [] },
    pricing: { type: Array, default: [] },
    approvedDate: { type: Date }
}, { timestamps: true });

// Password hashing middleware
doctorSchema.pre('save', async function (next) {
    if (!this.password || !this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Match password method
doctorSchema.methods.matchPassword = async function (enteredPassword) {
    if (!this.password) return false;
    return await bcrypt.compare(enteredPassword, this.password);
};

const Doctor = mongoose.model('Doctor', doctorSchema);
export default Doctor;
